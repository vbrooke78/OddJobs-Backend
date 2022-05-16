const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  deleteUser,
  putUser,
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
//PUT /api/users/:user_id
router.put("/:user_id", upload.single("productImage"), putUser);
module.exports = router;
