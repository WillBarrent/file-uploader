require("dotenv").config();

const path = require("node:path");
const express = require("express");
const app = express();
const passport = require('passport');

const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("./generated/prisma");
const authRouter = require("./routes/authRoute");
const indexRouter = require("./routes/indexRoute");

const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

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

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRouter);
app.use("/", indexRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("App is listening on port", PORT);
});
