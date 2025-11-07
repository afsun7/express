function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.redirect("/login");
}
function redirectIfIsAuth(req, res, next) {
  // برای کسی که میخواهد وارد صفحات لاگین شوداگر لاگین کرده بود بره صصفحه پروفایل در غیر این صورت اجازه بدهد برود به صفحه لاگین
  if (req.isAuthenticated()) return res.redirect("/profile");
  return next();
}
module.exports = {
  redirectIfIsAuth,
  checkAuthentication,
};
