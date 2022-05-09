const messageModel = require("../models/messages.models");
const asyncHandler = require("express-async-handler");

const postMessage = asyncHandler(async (req, res) => {
  const message = await messageModel.postMessage(req.body);
  console.log(message);
  res.status(200).send({ message });
});

const putMessage = asyncHandler(async (req, res) => {
  const message = await messageModel.putMessage(
    req.params.message_id,
    req.body
  );
  res.status(202).send({ message });
});
module.exports = { postMessage, putMessage };
