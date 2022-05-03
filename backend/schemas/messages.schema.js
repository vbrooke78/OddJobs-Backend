const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  jobId: {
      type: ObjectId,
      required: true,
  },
  content: [
      {
        userId: {
          type: Schema.Types.ObjectId, 
          ref: "User",
          required: true
        }, 
        text: {
          type:String,
          required: true
        }, 
        date: {
          type: Date,
          required: true
        }
      }],
});

module.exports = mongoose.model("Messages", messageSchema);