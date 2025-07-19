const { Router } = require("express");
const indexRouter = Router();
const {
  indexGet,
  myFoldersGet,
  addFolderPost,
  folderDeleteGet,
  folderUpdatePost,
} = require("../controllers/indexController");

indexRouter.get("/", indexGet);



module.exports = indexRouter;
