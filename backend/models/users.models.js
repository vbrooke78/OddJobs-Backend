const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const jwt = require("jsonwebtoken");
// const joi = require("joi");
// const passwordComplexity = require("joi-password-complexity");

const userSchema = new Schema(
  {
    username: { type: String, require: true, unique: true },
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: [
      {
        city: String,
        street: String,
        postCode: String,
      },
    ],
    phoneNumber: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    img: {
      type: String,
    },
    messages: [{ type: Schema.Types.ObjectId, ref: "messages" }],
    reviews: [{ type: String }],
  },
  {
    collection: "users",
  },
  {
    timestamp: true,
  }
);

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: "30d",
//   });
//   return token;
// };

module.exports = mongoose.model("User", userSchema);
