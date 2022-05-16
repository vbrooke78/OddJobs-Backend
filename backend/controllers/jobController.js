const jobsModel = require("../models/jobs.models.js");
const asyncHandler = require("express-async-handler");

const getJobs = asyncHandler(async (req, res, next) => {
  const { category } = req.query;

  const jobs = await jobsModel.getAllJobs(category);
  res.status(200).send({ jobs });
});

const postJobs = asyncHandler(async (req, res) => {

  const job = await jobsModel.postJob(req.body);
  res.status(201).json({ job });
});

const getJobById = asyncHandler(async (req, res, next) => {
  const job = await jobsModel.getJobById(req.params.id);
  res.status(200).send({ job });
});

const putJobById = asyncHandler(async (req, res) => {
  const job = await jobsModel.updateJob(req.params.id, req.body);

  res.status(202).send({ job });
});

const deleteJobById = asyncHandler(async (req, res) => {
  jobsModel.deleteJobById(req.params.id);
  res.status(204).send();
});

module.exports = {
  getJobs,
  postJobs,
  getJobById,
  putJobById,
  deleteJobById,
};
//
