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

/**
 * Create a special route for "main" folder
 * and use another route for the rest of the folders. 
 * 
 * Pass headfolderid to the each route
 * and create a link to back to the previous folder page
*/

folderRouter.get("/folders/:folderName/:headFolderId", myFoldersGet);
folderRouter.post("/folders/add/:folderName/:headFolderId", newFolderValidation, addFolderPost);
folderRouter.get("/folders/delete/:folderId", folderDeleteGet);
folderRouter.post("/folders/edit/", editFolderValidation, folderUpdatePost);

module.exports = folderRouter;
