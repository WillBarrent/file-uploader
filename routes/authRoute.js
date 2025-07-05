const { Router } = require("express");
const authRouter = Router();

const {
  signUpGet,
  signUpPost,
  loginGet,
  loginPost,
  logOutGet,
} = require("../controllers/authController");

authRouter.get("/sign-up", signUpGet);
authRouter.post("/sign-up", signUpPost);

authRouter.get("/login", loginGet);
authRouter.post("/login", loginPost);

authRouter.get("/log-out", logOutGet)

module.exports = authRouter;