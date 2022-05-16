const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  name: String,
  productImage: { type: String },
});

module.exports = mongoose.model("Image", imageSchema);
