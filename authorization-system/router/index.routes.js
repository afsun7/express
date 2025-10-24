const { Router } = require("express");
const { AuthRouters } = require("./auth.routes");
const { ProfileRouter } = require("./profile.routes");
const { checkAuth } = require("../middleWare/check.aut");

const router = Router();
router.use("/auth", AuthRouters);
router.use("/user", checkAuth, ProfileRouter);
module.exports = {
  AllRouters: router,
};
