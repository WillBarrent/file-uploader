const { PrismaClient } = require("../generated/prisma");

async function indexGet(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }

  const prisma = new PrismaClient();
  const userId = Number(req.session.passport.user);

  const folders = await prisma.folder.findMany({
    where: {
      userId: userId,
    },
  });

  res.render("index", {
    folders: folders,
    username: req.session.passport.username,
  });
}

module.exports = {
  indexGet,
};
