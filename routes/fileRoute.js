const { Router } = require("express");
const {
  fileUploadPost,
  fileDownloadPost,
  fileInfoGet,
  fileDeleteGet,
} = require("../controllers/fileController");
const fileRouter = Router();

fileRouter.post("/add-file/:folderName", fileUploadPost);
fileRouter.post("/download/:fileId", fileDownloadPost);
fileRouter.get("/files/info/:fileId", fileInfoGet);
fileRouter.get("/files/delete/:fileId", fileDeleteGet);

module.exports = fileRouter;
