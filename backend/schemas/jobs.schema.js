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
  location: {
    latitude: Number,
    longitude: Number,
  },
  user_id: Schema.Types.ObjectId,
});

module.exports = mongoose.model("Jobs", jobSchema);