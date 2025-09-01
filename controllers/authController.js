const { PrismaClient } = require("../generated/prisma");
const { hashPassword } = require("../utils/passwordUtils");
const { validationResult } = require("express-validator");
const passport = require("passport");

const signUpGet = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/folders/main");
  }

  res.render("sign-up");
};

const signUpPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.render("sign-up", {
        errors: errors.errors,
      });
    }

    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const prisma = new PrismaClient();

    const uploadTime = new Date();

    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        folders: {
          create: [
            {
              name: "main",
              uploadTime: uploadTime,
            },
          ],
        },
      },
    });

    res.redirect("/login");
  } catch (err) {
    next(err);
  }
};

const loginGet = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/folders/main");
  }

  res.render("login");
};

const loginPost = passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/folders/main",
  failureMessage: true,
});

const logOutGet = async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.redirect("/login");
  });
};

module.exports = {
  signUpGet,
  signUpPost,
  loginGet,
  loginPost,
  logOutGet,
};
