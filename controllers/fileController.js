const http = require("http");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const upload = multer({
  dest: "/home/barrent/Desktop/NodeJS/file-uploader/uploads",
});

const { PrismaClient } = require("../generated/prisma");

const fileUploadPost = [
  upload.single("file"),
  async function (req, res) {
    const { folderName } = req.params;
    const { filename, originalname, path, size } = req.file;
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

    await prisma.folder.update({
      where: {
        uniqueFolderForUser: {
          name: folderName,
          userId: req.session.passport.user,
        },
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

    res.redirect("/");
  },
];

async function fileDownloadPost(req, res) {
  const { file_to_download: fileToDownload, file_name: fileName } = req.body;

  let request = http.request(fileToDownload, function (response) {
    res.setHeader("content-disposition", "attachment; filename=" + fileName);
    response.pipe(res);
  });

  request.end();
}

async function fileInfoGet(req, res) {
  const { fileId } = req.params;

  const prisma = new PrismaClient();

  const fileInfo = await prisma.file.findFirst({
    where: {
      id: Number(fileId),
    },
  });

  const uTime = fileInfo.uploadTime;

  res.render("file-info", {
    fileInfo: {
      ...fileInfo,
      uploadTime: `${uTime.getDate()}/${uTime.getMonth()}/${uTime.getFullYear()}`,
    },
  });
}

async function fileDeleteGet(req, res) {
  const { fileId } = req.params;
  const prisma = new PrismaClient();

  await prisma.file.delete({
    where: {
      id: Number(fileId),
    },
  });

  res.redirect("/");
}

module.exports = {
  fileUploadPost,
  fileDownloadPost,
  fileInfoGet,
  fileDeleteGet,
};
