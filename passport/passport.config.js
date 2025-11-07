const { Strategy: localStrategy } = require("passport-local");
const { userModel } = require("./model/user.model");
const { compareSync } = require("bcrypt");
function passportInit(passport) {
  const authenticatedUser = async (username, password, done) => {
    try {
      const user = await userModel.findOne({ username });
      if (!user)
        return done(null, false, { message: "not found user account" });
      if (compareSync(password, user.password)) return done(null, user);
      return done(null, false, {
        message: "username or password is incorrect",
      });
    } catch (error) {
      // doneسه تا پرارامتر دارد اولی ارور هست دومی آبجکت یوزر هست  و پارامتر سوم مسیج هست که باید فلش را به پسوورد متصل میکنیم که این مسیج به پسورد معرفی کنیم
      done();
    }
  };
  const localStrategyInstance = new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    authenticatedUser
  );
  //Passport باید بداند چطور کاربر را در session نگه دارد و بعداً دوباره بشناسد
  const serializeUser = passport.serializeUser(async (user, done) => {
    return done(null, user.id);
  });
  const deserializeUser = passport.deserializeUser(async (id, done) => {
    const user = await userModel.findOne({ _id: id });
    if (!user) return done(null, false, { message: "not found user account!" });
    return done(null, user);
  });
  passport.use("local", localStrategyInstance, serializeUser, deserializeUser);
}
module.exports = { passportInit };
