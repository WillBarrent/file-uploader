const { Router } = require("express");
const {
  indexGet,
  myFoldersGet,
  fileUploadPost,
  fileDownloadPost,
} = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexGet);
indexRouter.get("/folders/:folderName", myFoldersGet);
indexRouter.post("/add-file/:folderName", fileUploadPost);
indexRouter.post("/download/:fileId", fileDownloadPost);

module.exports = indexRouter;
