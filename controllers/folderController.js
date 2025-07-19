const { PrismaClient } = require("../generated/prisma");

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

  res.render("folder", {
    folderName: folderName,
    files: files.map((file) => {
      const uTime = file.uploadTime;

      return {
        ...file,
        uploadTime: `${uTime.getDate()}/${uTime.getMonth()}/${uTime.getFullYear()}`,
      };
    }),
    username: req.session.passport.username,
  });
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

async function folderDeleteGet(req, res) {
  const { folderId } = req.params;
  const prisma = new PrismaClient();

  await prisma.file.deleteMany({
    where: {
      folderId: Number(folderId),
    },
  });

  await prisma.folder.delete({
    where: {
      id: Number(folderId),
    },
  });

  res.redirect("/");
}

async function folderUpdatePost(req, res) {
  const { editFolderId, newFolderName } = req.body;

  const prisma = new PrismaClient();

  await prisma.folder.update({
    where: {
      id: Number(editFolderId),
    },
    data: {
      name: newFolderName,
    },
  });

  res.redirect("/");
}

module.exports = {
  myFoldersGet,
  folderDeleteGet,
  addFolderPost,
  folderUpdatePost,
};
