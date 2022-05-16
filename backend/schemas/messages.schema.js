const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  messages: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },

      content_type: String,

      content: {
        type: String,
      },

      created_at: Date,
      updated_at: Date,
      unread: Boolean,
    },
  ],
  users: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      unread: Number,
    },
  ],
});

module.exports = mongoose.model("Messages", messageSchema);
