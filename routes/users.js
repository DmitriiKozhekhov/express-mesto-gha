const router = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  editUser,
  editAvatar,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:userId", getUser);
router.post("/users", createUser);
router.patch("/users/me", editUser);
router.patch("/users/me/avatar", editAvatar);

module.exports = router;
