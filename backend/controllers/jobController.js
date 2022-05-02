const Jobs = require("../models/jobsModels");
const asyncHandler = require("express-async-handler");

const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Jobs.find({ jobs: req.body });
  console.log(jobs.length);
  res.json(jobs);
});
//
//
//
//
const postJobs = asyncHandler(async (req, res) => {
  const { title, category, price, address } = req.body;

  if (
    !title ||
    !category ||
    !price ||
    !address.street ||
    !address.city ||
    !address.postalCode
  ) {
    res.status(400);
    throw new Error("please include all fields");
  }

  const jobs = await Jobs.create({
    title: title,
    category: category,
    price: price,
    address: {
      street: address.street,
      city: address.city,
      postalCode: address.postalCode,
    },
  });

  res.status(200).json({ jobs: jobs });
});
//
//
//
//
const getJobById = asyncHandler(async (req, res) => {
  // console.log(typeof req.params.id, `type of`.purple);
  try {
    const job = await Jobs.findById(req.params.id);
    if (!job) {
      res.status(400);
      throw new Error("job not found");
    }
    res.status(200).json({ job: job });
  } catch (err) {
    res.status(400);
    throw new Error("job not found");
  }
});
//
//
//
//
const putJobById = asyncHandler(async (req, res) => {
  try {
    const job = await Jobs.findById(req.params.id);
    console.log(job.address.city);
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
    res.status(200).json({ msg: `deleted job ${req.params.id}` });
  } catch (err) {
    res.status(400);
    throw new Error("job not found");
  }
});

module.exports = { getJobs, postJobs, getJobById, putJobById, deleteJobById };
