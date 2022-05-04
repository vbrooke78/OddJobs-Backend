const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/userController");

//POST /api/users/register
router.post("/register", registerUser);
//POST /api/users/login
router.post("/login", loginUser);
//GET /api/users
router.get("/", getUsers);
//GET /api/users/:user_id
router.get("/:user_id", getUser);
//DELETE /api/users/:user_id
router.delete("/:user_id", deleteUser);
module.exports = router;
