const express = require("express");
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

const router = express.Router();
const {
  getJobs,
  postJobs,
  getJobById,
  putJobById,
  deleteJobById,
  getJobByCategory,
} = require("../controllers/jobController");
//GET /api/jobs
router.get("/", getJobs);
//POST /api/jobs
router.post("/", upload.single("productImage"), postJobs);
//GET /api/jobs/:id
router.get("/:id", getJobById);
//PUT /api/jobs/:id
router.put("/:id", putJobById);
//DELETE /api/jobs/:id
router.delete("/:id", deleteJobById);
// Get jobs by category /api/jobs/:category

module.exports = router;
