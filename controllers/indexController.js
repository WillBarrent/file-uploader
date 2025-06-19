const multer = require("multer");
const { PrismaClient } = require("../generated/prisma");
const upload = multer({
  dest: "/home/barrent/Desktop/NodeJS/file-uploader/uploads",
});

async function indexGet(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("login");
  }
  
  res.render("index");
}

const fileUploadPost = [
  upload.single("file"),
  async function (req, res) {

    console.log(req.file);

    res.redirect("/");
  },
];

module.exports = {
  indexGet,
  fileUploadPost,
};
