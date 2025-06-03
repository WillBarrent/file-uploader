const { PrismaClient } = require("./generated/prisma");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const verifyCallback = async (username, password, done) => {
  try {
    const prisma = new PrismaClient();

    const user = prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    await prisma.$disconnect();

    const userRow = user.length === 0 ? null : user[0];
    const userPassword = user.length === 0 ? null : userRow["password"];

    if (!user) {
      return done(null, false, { message: "User not found" });
    }

    const isValid = await validatePassword(password, userPassword);

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Incorrect password" });
    }
  } catch (e) {
    done(err);
  }
};

const strategy = LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const prisma = new PrismaClient();

    const user = prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    await prisma.$disconnect();

    done(null, user[0]);
  } catch (e) {
    done(err);
  }
});
