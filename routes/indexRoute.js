const { Router } = require("express");
const { indexGet, fileUploadPost, testGet } = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexGet);
indexRouter.post("/add-file", fileUploadPost);

module.exports = indexRouter;
