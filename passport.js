const { PrismaClient } = require("./generated/prisma");
const passport = require("passport");
const { validatePassword } = require("./utils/passwordUtils");
const LocalStrategy = require("passport-local").Strategy;

const verifyCallback = async (username, password, done) => {
  try {
    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    await prisma.$disconnect();

    if (!user) {
      return done(null, false, { message: "User not found" });
    }
    
    const userPassword = user["password"];

    const isValid = await validatePassword(password, userPassword);

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Incorrect password" });
    }
  } catch (e) {
    done(e);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    console.log(user);

    await prisma.$disconnect();

    done(null, user);
  } catch (e) {
    done(e);
  }
});
