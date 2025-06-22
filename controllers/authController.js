const { PrismaClient } = require("../generated/prisma");
const { hashPassword } = require("../utils/passwordUtils");
const passport = require("passport");

const signUpGet = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  res.render("sign-up");
};

const signUpPost = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  const { username, password } = req.body;
  const hashedPassword = await hashPassword(password);

  const prisma = new PrismaClient();

  await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
      folders: {
        create: [
          {
            name: "my-drive",
            path: "/my-drive",
          },
        ],
      },
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
  successRedirect: "/",
  failureMessage: true,
});

module.exports = {
  signUpGet,
  signUpPost,
  loginGet,
  loginPost,
};
