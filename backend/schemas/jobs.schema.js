const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: String,
  category: {
    type: String,
    require: true,
  },
  price: { type: Number },
  createdAt: Date,
  updatedAt: Date,
  postcode: {
    lat: Number,
    lng: Number,
  },
  image: { type: String },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Jobs", jobSchema);
