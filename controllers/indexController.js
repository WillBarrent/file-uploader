const multer = require("multer");
const { PrismaClient } = require("../generated/prisma");
const upload = multer({
  dest: "/home/barrent/Desktop/NodeJS/file-uploader/uploads",
});

async function indexGet(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }

  const prisma = new PrismaClient();

  const files = await prisma.file.findMany();
  const folders = await prisma.folder.findMany();

  console.log(folders);

  res.render("index", {
    files: files,
    folders: folders,
  });
}

async function myFoldersGet(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }

  const { folderName } = req.params;

  const prisma = new PrismaClient();

  const files = await prisma.file.findMany({
    where: {
      folder: {
        name: folderName,
      },
    },
  });

  res.render("folders", {
    folderName: folderName,
    files: files,
  });
}

const fileUploadPost = [
  upload.single("file"),
  async function (req, res) {
    const { folderName } = req.params;
    const { filename, originalname, path, size } = req.file;
    const uploadTime = new Date();

    const prisma = new PrismaClient();

    await prisma.folder.update({
      where: {
        name: folderName,
      },
      data: {
        files: {
          create: [
            {
              fileName: filename,
              originalName: originalname,
              path: path,
              size: size,
              uploadTime: uploadTime,
            },
          ],
        },
      },
    });

    await prisma.$disconnect();

    res.redirect("/");
  },
];

async function fileDownloadPost(req, res) {
  const { file_to_download: fileToDownload, file_name: fileName } = req.body;

  res.download(fileToDownload, fileName);
}

async function addFolderPost(req, res) {
  const { newFolderName } = req.body;

  const prisma = new PrismaClient();
  const userId = req.session.passport.user;

  await prisma.folder.create({
    data: {
      name: newFolderName,
      userId: userId,
    },
  });

  res.redirect("/");
}

module.exports = {
  indexGet,
  fileUploadPost,
  myFoldersGet,
  fileDownloadPost,
  addFolderPost,
};
