const { PrismaClient } = require("../generated/prisma");
const { hashPassword } = require("../utils/passwordUtils");
const passport = require("passport");

const signUpGet = (req, res) => {
  res.render("sign-up");
};
const signUpPost = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/upload-file");
  }

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
  if (req.isAuthenticated()) {
    return res.redirect("/upload-file");
  }

  res.render("login");
};
const loginPost = passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/upload-file",
  failureMessage: true,
});

module.exports = {
  signUpGet,
  signUpPost,
  loginGet,
  loginPost,
};
