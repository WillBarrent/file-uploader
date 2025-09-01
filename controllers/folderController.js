const { PrismaClient } = require("../generated/prisma");

async function myFoldersGet(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }

  const { folderName, headFolderId } = req.params;

  const prisma = new PrismaClient();
  const userId = Number(req.session.passport.user);
  let isPreviousMain = false;

  const previousFolder = await prisma.folder.findFirst({
    where: {
      id: Number(headFolderId),
    },
  });

  console.log(previousFolder);

  if (previousFolder.headFolderId === null) {
    isPreviousMain = true;
  }

  const headFolder = await prisma.folder.findFirst({
    where: {
      name: folderName,
      headFolderId: Number(headFolderId),
      userId: userId,
    },
    include: {
      folders: true,
      files: true,
    },
  });

  const folders = headFolder.folders;
  const files = headFolder.files;

  res.render("index", {
    folderName: folderName,
    files: files.map((file) => {
      const uTime = file.uploadTime;

      return {
        ...file,
        uploadTime: `${uTime.getDate()}/${uTime.getMonth()}/${uTime.getFullYear()}`,
      };
    }),
    folders: folders,
    mainHeadFolderId: headFolder.id,
    headFolderId: headFolderId,
    username: req.session.passport.username,
    isPreviousMain: isPreviousMain,
    previousFolderName: previousFolder.name,
    previousFolderId: previousFolder.headFolderId
  });
}

async function addFolderPost(req, res) {
  const { newFolderName } = req.body;
  const { folderName, headFolderId } = req.params;

  console.log(headFolderId);

  const prisma = new PrismaClient();
  const userId = req.session.passport.user;

  const uploadTime = new Date();

  const headFolder = await prisma.folder.findFirst({
    where: {
      userId: userId,
      name: folderName,
      headFolderId: Number(headFolderId),
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
      id: headFolder.id,
      userId: userId,
      headFolderId: headFolder.headFolderId,
      name: folderName,
    },
    data: {
      folders: {
        connect: {
          id: newFolder.id,
        },
      },
    },
  });

  res.redirect(`/folders/${headFolder.name}/${headFolder.headFolderId}`);
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

  res.redirect("/folders/main");
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

  res.redirect("/folders/main");
}

module.exports = {
  myFoldersGet,
  folderDeleteGet,
  addFolderPost,
  folderUpdatePost,
};
