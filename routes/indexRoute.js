const { Router } = require("express");
const indexRouter = Router();
const {
  mainFolderGet,
  mainFolderCreatePost,
  mainFileCreatePost,
} = require("../controllers/indexController");
const { newFolderValidation } = require("../utils/validatonUtils");

indexRouter.get("/folders/main", mainFolderGet);
indexRouter.post(
  "/folders/add/main",
  newFolderValidation,
  mainFolderCreatePost
);
indexRouter.post("/files/add/main", mainFileCreatePost);

module.exports = indexRouter;
