const { Router } = require("express");
const authRouter = Router();

const {
  signUpGet,
  signUpPost,
  loginGet,
  logOutGet,
} = require("../controllers/authController");
const {
  signUpValidation,
  loginValidation,
} = require("../utils/validatonUtils");

authRouter.get("/sign-up", signUpGet);
authRouter.post("/sign-up", signUpValidation, signUpPost);

authRouter.get("/login", loginGet);
authRouter.post("/login", loginValidation);

authRouter.get("/log-out", logOutGet);

module.exports = authRouter;
