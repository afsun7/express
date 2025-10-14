const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser("cd7b5f2e935a30dd9ab63e61358b2e5fe4eeb38d"));

app.get("/set-cookie", (req, res) => {
  // const expiresDate = new Date(Date.now() + 60 * 1000); // 60 ثانیه آینده
  // res.cookie("cookieName", "cookieValue", { expires: expiresDate });
  res.cookie("cookieName", "cookieValue", {
    maxAge: 5000,
    httpOnly: true,
    signed: true,
    secure: true,
    sameSite: "strict",
  });
  res.cookie("javaScript", "nodeJs, express");
  res.send("cookie have been successfully");
});

app.get("/get-cookie", (req, res) => {
  const cookie = req.cookies;
  const signedCookies = req.signedCookies;
  res.send({ cookie, signedCookies });
});
app.get("/clear-cookie", (req, res) => {
  res.clearCookie("javaScript");
  res.send("cookie have been deleted successfully");
});

app.listen(3000, () => {
  console.log("server run on port 3000");
});
