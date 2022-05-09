const messageModel = require("../models/messages.models");
const asyncHandler = require("express-async-handler");

const postMessage = asyncHandler(async (req, res) => {
  const message = await messageModel.postMessage(req.body);
  console.log(message);
  res.status(200).send({ message });
});

const deleteMessage = asyncHandler(async (req, res) => {
  messageModel.deleteMessage(req.params.message_id);
  res.status(204).send();
});

module.exports = { postMessage, deleteMessage };
