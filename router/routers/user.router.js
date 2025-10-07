const { Router } = require("express");
const {
  getUsers,
  createNewUsers,
  deleteUser,
  patchUser,
} = require("../controllers/user.controller");
const router = Router();
router.get("/", getUsers);
router.post("/", createNewUsers);
router.delete("/:id", deleteUser);
router.patch("/:id", patchUser);

module.exports = router;
