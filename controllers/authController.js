const { PrismaClient } = require("../generated/prisma");
const { hashPassword } = require("../utils/passwordUtils");
const passport = require('passport');

const signUpGet = (req, res) => {
  res.render("sign-up");
};
const signUpPost = async (req, res) => {
  const { username, password } = req.body;
  const prisma = new PrismaClient();

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
    },
  });

  res.redirect("/login");
};

const loginGet = (req, res) => {
  res.render("login");
};
const loginPost = passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/",
  failureMessage: true,
});

module.exports = {
  signUpGet,
  signUpPost,
  loginGet,
  loginPost,
};
