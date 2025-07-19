const { Router } = require("express");
const {
  myFoldersGet,
  addFolderPost,
  folderDeleteGet,
  folderUpdatePost,
} = require("../controllers/folderController");
const folderRouter = Router();

folderRouter.get("/folders/:folderName", myFoldersGet);
folderRouter.post("/add-folder", addFolderPost);
folderRouter.get("/folders/delete/:folderId", folderDeleteGet);
folderRouter.post("/folders/edit/", folderUpdatePost);

module.exports = folderRouter;
