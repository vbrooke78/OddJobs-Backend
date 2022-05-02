const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
  },
  address: {
    street: String,
    city: String,
    postalCode: String,
  },
  createdAt: Date,
  updatedAt: Date,
  //   user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     required: true,
  //     ref: "User",
  //   },
});

module.exports = mongoose.model("Jobs", jobSchema);
