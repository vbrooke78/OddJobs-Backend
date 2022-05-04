// const Jobs = require("../models/jobsModels");
const User = require("../schemas/users.schema.js");
const Jobs = require("../schemas/jobs.schema.js");
const asyncHandler = require("express-async-handler");

const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Jobs.find({ jobs: req.body });

  // console.log(jobs.length);
  console.log(jobs.length);
  res.json({ jobs: jobs });
});
//
//
//
//
const postJobs = asyncHandler(async (req, res) => {
  const { title, category, price, street, city, postalCode } = req.body;

  if (!title || !category || !price || !street || !city || !postalCode) {
    res.status(400);
    throw new Error("please include all fields");
  }
  const user = await User.findById(req.body.user_id);
  const jobs = await Jobs.create({
    title: title,
    description: req.body.description,
    category: category,
    price: price,
    street: street,
    city: city,
    postalCode: postalCode,
    user_id: user.user_id,
  });

  res.status(200).json({ jobs: jobs });
});
//
//
//
//
const getJobById = asyncHandler(async (req, res, next) => {
  // console.log(typeof req.params.id, `type of`.purple);

  try {
    const job = await Jobs.findById(req.params.id);
    console.log(job, "<<<<");

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
