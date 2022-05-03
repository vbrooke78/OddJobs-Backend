const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const addressSchema = mongoose.Schema({
//   street: [String],
//   city: [String],
//   postalCode: [String],
// });

const jobSchema = new Schema({
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
<<<<<<< Updated upstream
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  //   user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     required: true,
  //     ref: "User",
  //   },
=======
  location: {
    latitude: Number,
    longitude: Number,
  },
  user_id: Schema.Types.ObjectId,
>>>>>>> Stashed changes
});

module.exports = mongoose.model("Jobs", jobSchema);
