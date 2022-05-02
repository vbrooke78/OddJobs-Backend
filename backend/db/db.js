const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const ENV = process.env.NODE_ENV || 'development';

const connectDB = async () => {

  try {
    await mongoose.connect(process.env.MONGO_URI);

  } catch (err) {
    console.log(err);
    mongoose.disconnect();
    process.exit(1);
  }
};

module.exports = connectDB;
