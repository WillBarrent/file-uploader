const { Router } = require("express");
const {
  myFoldersGet,
  addFolderPost,
  folderDeleteGet,
  folderUpdatePost,
} = require("../controllers/folderController");
const {
  newFolderValidation,
  editFolderValidation,
} = require("../utils/validatonUtils");
const folderRouter = Router();

folderRouter.get("/folders/:folderName", myFoldersGet);
folderRouter.post("/add-folder", newFolderValidation, addFolderPost);
folderRouter.get("/folders/delete/:folderId", folderDeleteGet);
folderRouter.post("/folders/edit/", editFolderValidation, folderUpdatePost);

module.exports = folderRouter;
