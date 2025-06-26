const { Router } = require("express");
const {
  indexGet,
  myFoldersGet,
  fileUploadPost,
  fileDownloadPost,
  addFolderPost,
} = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexGet);
indexRouter.get("/folders/:folderName", myFoldersGet);
indexRouter.post("/add-file/:folderName", fileUploadPost);
indexRouter.post("/download/:fileId", fileDownloadPost);
indexRouter.post("/add-folder", addFolderPost);

module.exports = indexRouter;
