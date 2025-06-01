require("dotenv").config();

const express = require("express");
const app = express();

const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("./generated/prisma");

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

const PORT = 3000;

app.listen(PORT, () => {
  console.log("App is listening on port", PORT);
});
