require("dotenv").config();

const path = require("node:path");
const express = require("express");
const app = express();
const passport = require('passport');

const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("./generated/prisma");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
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

app.get('/', async (req, res) => {
    const prisma = new PrismaClient();

    const allUsers = await prisma.user.findMany();

    await prisma.$disconnect();
    
    console.log(allUsers);

    res.render("sign-up");
});

app.post("/sign-up", async (req, res) => {

  const {username, password} = req.body;
  const prisma = new PrismaClient();

  await prisma.user.create({
    data: {
      username: username,
      password: password,
    }
  });

  res.redirect("/");
});

app.get("/login", async (req, res) => {
  res.render("login");
})

app.post("/login", passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/",
  failureMessage: true,
}));

const PORT = 3000;

app.listen(PORT, () => {
  console.log("App is listening on port", PORT);
});
