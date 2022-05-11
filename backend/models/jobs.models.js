const User = require("../schemas/users.schema.js");
const Jobs = require("../schemas/jobs.schema.js");
const errors = require("../errors/errorHandler.js");

exports.getAllJobs = async (category) => {
  const query = {};
  if (category) {
    query.category = category;
  }
  const jobs = await Jobs.find(query);

  return jobs;
};

exports.getJobById = async (jobId) => {
  const job = await Jobs.findById(jobId);

  if (!job) return Promise.reject(errors.errMsg_idNotFound);

  return job;
};

exports.postJob = async (jobObj) => {
  const newJob = _validateJobObj(jobObj);
  const { title, description, category, price, postcode, user_id, status } =
    jobObj;
  console.log(jobObj, "keys");
  console.log(status, "status");
  if (!newJob) return Promise.reject(errors.errMsg_invalidPostObj);

  const res = await Jobs.create({
    title: title,
    description: description,
    category: category,
    price: price,
    postcode: {
      lat: postcode.lat,
      lng: postcode.lng,
    },
    status: status,
    user_id: user_id,
    // image: jobImg,
  });
  console.log(res);
  // const jobWithUserInfo = await res.populate({
  //     path: 'user_id',
  //     select: 'username'
  // });

  // return jobWithUserInfo;
  return res;
};

exports.updateJob = async (jobId, updates) => {
  const updatedJob = _validateJobObj(updates);

  if (!updatedJob) return Promise.reject(errors.errMsg_invalidPostObj);

  return await Jobs.findByIdAndUpdate(jobId, updatedJob, { new: true });
};

exports.deleteJobById = async (jobId) => {
  const job = await Jobs.findById(jobId);

  if (!job) return Promise.reject(errors.errMsg_idNotFound);

  await job.remove();
};

const _validateJobObj = (jobObj) => {
  const keys = [
    "title",
    "category",
    "price",
    "status",
    "postcode",
    "user_id",
    "description",
  ];
  const validObj = {};

  for (const key of keys) {
    if (jobObj[key] === undefined) {
      return false;
    }

    validObj[key] = jobObj[key];
  }

  return validObj;
};
