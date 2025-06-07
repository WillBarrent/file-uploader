const { Router } = require("express");
const authRouter = Router();

const {
  signUpGet,
  signUpPost,
  loginGet,
  loginPost,
} = require("../controllers/authController");

authRouter.get("/sign-up", signUpGet);
authRouter.post("/sign-up", signUpPost);

authRouter.get("/login", loginGet);
authRouter.post("/login", loginPost);

module.exports = authRouter;