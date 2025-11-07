const { hashSync } = require("bcrypt");
const { Router } = require("express");
const { userModel } = require("../model/user.model");
const { redirectIfIsAuth, checkAuthentication } = require("../middleware");
const router = Router();

// render این کد:
// فایل views/index.ejs را پیدا می‌کند
// آن را با layout (layout/main.ejs) ترکیب می‌کند
// title به template ارسال می‌شود
// HTML نهایی را به کاربر ارسال می‌کند
function initRoutes(passport) {
  router.get("/", (req, res) => {
    //محتوای index.ejs داخل layout/main.ejs (در <%- body %>) جای‌گذاری می‌شود.
    res.render("index", { title: "home page" });
  });

  router.get("/login", redirectIfIsAuth, (req, res) => {
    res.render("login", { title: "login" });
  });

  router.get("/register", redirectIfIsAuth, (req, res) => {
    res.render("register", { title: "register" });
  });
  router.post("/register", redirectIfIsAuth, async (req, res, next) => {
    try {
      const { fullname: fullName, username, password } = req.body;
      const hashPassword = hashSync(password, 10);
      const user = await userModel.findOne({ username });

      if (user) {
        // این برای این خط است که در اول هر کدام از صفحات اضافه شد  <%= messages?.error?? ""%>
        req.flash("error", "this username already exist");
        // ریفرر به جایی اشاره میکند که درخواست از انجا امده
        const referrer = req?.header("Referrer") ?? req.headers.referer;
        return res.redirect(referrer ?? "/register");
      }

      await userModel.create({
        fullName,
        username,
        password,
      });
      res.redirect("/login");
    } catch (error) {
      next(error);
    }
  });
  router.get("/logout", checkAuthentication, (req, res) => {
    req.logOut({ keepSessionInfo: false }, (err) => {
      if (err) console.log(err);
    });
    res.redirect("/login");
  });
  router.get("/profile", checkAuthentication, (req, res) => {
    user = req.user;
    res.render("profile", {
      title: "profile",
      user,
    });
  });
  router.post(
    "/login",
    redirectIfIsAuth,
    passport.authenticate("local", {
      successRedirect: "/profile",
      failureRedirect: "/login",
      // مسیج هایی که در passport.config ست کردیم با استفاده از این نمایش داده میشه
      failureFlash: true,
    }),
    async (req, res) => {
      res.redirect("/profile");
    }
  );
  return router;
}
module.exports = initRoutes;
