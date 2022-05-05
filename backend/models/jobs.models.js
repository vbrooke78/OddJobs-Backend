const User = require('../schemas/users.schema.js');
const Jobs = require('../schemas/jobs.schema.js');
const errors = require('../errors/errorHandler.js');

exports.getAllJobs = async () => {
  const jobs = await Jobs.find({});
  return jobs;
};

exports.getJobById = async (jobId) => {
  const job = await Jobs.findById(jobId);

  if (!job) return Promise.reject(errors.errMsg_idNotFound);

  return job;
};

exports.postJob = async (jobObj) => {
  const newJob = _validateJobObj(jobObj);

  if (!newJob) return Promise.reject(errors.errMsg_invalidPostObj);

  const res = await Jobs.create({ ...jobObj });
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

exports.getJobByCategory = async (category) => {
  const job = await Jobs.find({ category: category });
  console.log(category, '<<<<<<<<<<---- cat');
  return job;
};

const _validateJobObj = (jobObj) => {
  const keys = [
    'title',
    'category',
    'price',
    'location',
    'user_id',
    'description',
  ];
  const validObj = {};

  for (const key of keys) {
    if (!jobObj[key]) return false;

    validObj[key] = jobObj[key];
  }

  return validObj;
};
