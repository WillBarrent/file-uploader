const { Router } = require("express");
const {
  indexGet,
  myFoldersGet,
  fileUploadPost,
  fileDownloadPost,
  addFolderPost,
  fileInfoGet,
  folderDeleteGet,
  fileDeleteGet,
  folderUpdatePost,
} = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexGet);
indexRouter.get("/folders/:folderName", myFoldersGet);
indexRouter.post("/add-file/:folderName", fileUploadPost);
indexRouter.post("/download/:fileId", fileDownloadPost);
indexRouter.post("/add-folder", addFolderPost);
indexRouter.get("/files/info/:fileId", fileInfoGet);
indexRouter.get("/files/delete/:fileId", fileDeleteGet);
indexRouter.get("/folders/delete/:folderId", folderDeleteGet);
indexRouter.post("/folders/edit/", folderUpdatePost);

module.exports = indexRouter;
