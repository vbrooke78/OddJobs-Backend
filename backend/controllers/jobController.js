// const Jobs = require("../models/jobsModels");
const User = require("../schemas/users.schema.js");
const Jobs = require("../schemas/jobs.schema.js");
const asyncHandler = require("express-async-handler");

const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Jobs.find({ jobs: req.body });

  res.json({ jobs: jobs });
});
//
//
//
//
const postJobs = asyncHandler(async (req, res) => {
  const { title, category, price, location, description, user_id } = req.body;

  if (!title || !category || !price || !description || !user_id || !location) {
    res.status(400);
    throw new Error("please include all fields");
  }
  console.log(location, "location");
  const user = await User.findById(user_id);
  const jobs = await Jobs.create({
    title: title,
    description: description,
    category: category,
    price: price,
    user_id: user_id,
    location: { latitude: location.latitude, longitude: location.longitude },
  });
  console.log(jobs);
  res.status(201).json({ job: jobs });
});
//
//
//
//
const getJobById = asyncHandler(async (req, res, next) => {
  // console.log(typeof req.params.id, `type of`.purple);

  try {
    const job = await Jobs.findById(req.params.id);

    if (!job) {
      res.status(404).send({ msg: "ID Not Found" });
    }
    res.status(200).json({ job: job });
  } catch (err) {
    next(err);
  }
});

const putJobById = asyncHandler(async (req, res) => {
  try {
    const job = await Jobs.findById(req.params.id);
    // console.log(job.address.city);
    if (!job) {
      res.status(400);
      throw new Error("job not found");
    }
    const updateJob = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updateJob);
  } catch (err) {
    res.status(400);
    throw new Error("no job found");
  }
});
//
//
//
//
const deleteJobById = asyncHandler(async (req, res) => {
  try {
    const job = await Jobs.findById(req.params.id);
    await job.remove();
    res.status(202).json({ status: "Job deleted" });
  } catch (err) {
    res.status(400);
    throw new Error("job not found");
  }
});

module.exports = { getJobs, postJobs, getJobById, putJobById, deleteJobById };
