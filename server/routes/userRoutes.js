const { Router } = require("express");
const {
  getUsers,
  createUser,
  loginUser,
  getProfile,
} = require("../controller/userController");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", getUsers);
router.get("/profile", auth, getProfile);
router.post("/", createUser);
router.post("/login", loginUser);

module.exports = router;
