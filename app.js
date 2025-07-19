require("dotenv").config();

const path = require("node:path");
const express = require("express");
const app = express();
const passport = require("passport");
const expressSession = require("express-session");
const cloudinary = require("cloudinary").v2;

const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("./generated/prisma");
const authRouter = require("./routes/authRoute");
const indexRouter = require("./routes/indexRoute");
const fileRouter = require("./routes/fileRoute");
const folderRouter = require("./routes/folderRoute");

const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(
  expressSession({
    cookie: {
      maxAge: 60 * 60 * 24 * 1000,
    },
    secret: "mysecret",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

require("./passport");

app.get("/{*splat}", async (req, res, next) => {
  if (
    req.session.passport !== undefined &&
    req.session.passport.user !== undefined &&
    req.session.passport.username === undefined
  ) {
    const prisma = new PrismaClient();
    const userId = req.session.passport.user;

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    req.session.passport.username = user.username;
  }

  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRouter);
app.use("/", indexRouter);
app.use("/", fileRouter);
app.use("/", folderRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("App is listening on port", PORT);
});
