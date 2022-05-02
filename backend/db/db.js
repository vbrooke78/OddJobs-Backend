const mongoose = require("mongoose");

const ENV = process.env.NODE_ENV || 'development';


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `mongo connected ${conn.connection.host}`.blue.underline.bgBlack
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
