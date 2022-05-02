const express = require("express");

const router = express.Router();
const {
  getJobs,
  postJobs,
  getJobById,
  putJobById,
  deleteJobById,
} = require("../controllers/jobController");
//GET /api/jobs
router.get("/", getJobs);
//POST /api/jobs
router.post("/", postJobs);
//GET /api/jobs/:id
router.get("/:id", getJobById);
//PUT /api/jobs/:id
router.put("/:id", putJobById);
//DELETE /api/jobs/:id
router.delete("/:id", deleteJobById);

module.exports = router;
