const { PrismaClient } = require("../generated/prisma");

const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const upload = multer({
  dest: "/home/barrent/Desktop/NodeJS/file-uploader/uploads",
});

async function mainFolderGet(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }

  const prisma = new PrismaClient();
  const userId = Number(req.session.passport.user);

  const mainFolder = await prisma.folder.findFirst({
    where: {
      userId: userId,
      name: "main",
      headFolderId: null,
    },
    include: {
      folders: true,
      files: true,
    },
  });

  const subFolders = mainFolder.folders;
  const mainFiles = mainFolder.files;
  const headFolderId = mainFolder.id;

  return res.render("index", {
    folders: subFolders,
    folderName: "main",
    files: mainFiles,
    username: req.session.passport.username,
    headFolderId: headFolderId,
    mainHeadFolderId: headFolderId,
    isMain: true,
  });
}

async function mainFolderCreatePost(req, res) {
  const { newFolderName } = req.body;

  const prisma = new PrismaClient();
  const userId = req.session.passport.user;

  const uploadTime = new Date();

  const mainFolder = await prisma.folder.findFirst({
    where: {
      userId: userId,
      name: "main",
      headFolderId: null,
    },
  });

  const newFolder = await prisma.folder.create({
    data: {
      name: newFolderName,
      userId: userId,
      uploadTime: uploadTime,
    },
  });

  await prisma.folder.update({
    where: {
      id: mainFolder.id,
      userId: userId,
      headFolderId: null,
      name: "main",
    },
    data: {
      folders: {
        connect: {
          id: newFolder.id,
        },
      },
    },
  });

  res.redirect("/folders/main");
}

const mainFileCreatePost = [
  upload.single("file"),
  async function (req, res) {
    const { folderName } = req.params;
    const { filename, originalname, path, size } = req.file;
    const userId = req.session.passport.user;
    const uploadTime = new Date();

    const prisma = new PrismaClient();

    const cloudinaryFilePath = "username" + folderName + "/" + path;

    const cloudinaryFileUploadResult = await cloudinary.uploader
      .upload(path, { public_id: cloudinaryFilePath, resource_type: "auto" })
      .then((result) => {
        return {
          message: "Success",
          url: result.url,
        };
      })
      .catch((err) => {
        console.log(err);
      });

    const mainFolder = await prisma.folder.findFirst({
      where: {
        userId: userId,
        name: "main",
        headFolderId: null,
      },
    });

    await prisma.folder.update({
      where: {
        id: mainFolder.id,
        userId: userId,
        headFolderId: null,
        name: "main",
      },
      data: {
        files: {
          create: [
            {
              fileName: filename,
              originalName: originalname,
              path: cloudinaryFileUploadResult.url,
              size: size,
              uploadTime: uploadTime,
            },
          ],
        },
      },
    });

    await prisma.$disconnect();

    res.redirect("/folders/main");
  },
];

module.exports = {
  mainFolderGet,
  mainFolderCreatePost,
  mainFileCreatePost,
};
