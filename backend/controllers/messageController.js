const messageModel = require("../models/messages.models");
const asyncHandler = require("express-async-handler");

const postMessage = asyncHandler(async (req, res) => {
  const message = await messageModel.postMessage(req.body);
  res.status(200).send({ message });
});

const putMessage = asyncHandler(async (req, res) => {
  const message = await messageModel.putMessage(req.params, req.body);
  res.status(202).send({ message });
});

const deleteMessage = asyncHandler(async (req, res) => {
  const message = await messageModel.deleteMessage(req.params);
  res.status(204).send({ message });
});

const getMessage = asyncHandler(async (req, res) => {
  const message = await messageModel.getMessage(req.params, req.query);
  res.status(200).send({ message });
});

const postContent = asyncHandler(async (req, res) => {
  const message = await messageModel.postContent(
    req.params.message_id,
    req.body
  );
  res.status(200).send({ message });
});

const getUserContent = asyncHandler(async (req, res) => {
  const message = await messageModel.getUserContent(req.params);
  res.status(200).send({ message });
});

const getChatsByUser = asyncHandler(async (req, res) => {
  const message = await messageModel.getChatsByUser(req.params.user_id);
  res.status(200).send({ message });
});
module.exports = {
  postMessage,
  getMessage,
  postContent,
  putMessage,
  deleteMessage,
  getUserContent,
  getChatsByUser,
};
