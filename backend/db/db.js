const mongoose = require("mongoose");
const ENV = process.env.NODE_ENV || 'development';
  console.log(`${__dirname}/../../.env.${ENV}`)
require("dotenv").config({
  path: `${__dirname}/../../.env.${ENV}`
})

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
