const asyncHandler = require("express-async-handler");
const User = require("../schemas/users.schema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersModel = require("../models/users.models.js");

const registerUser = asyncHandler(async (req, res) => {
  const user = await usersModel.createNewUser(req.body);
  res.status(201).send({ user });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await usersModel.getAllUsers();
  res.status(200).json({ users });
});

const getUser = asyncHandler(async (req, res) => {
  const user = await usersModel.getUserById(req.params.user_id);
  res.status(200).json({ user });
});

const loginUser = asyncHandler(async (req, res) => {
  const userLogin = await usersModel.loginUser(
    req.body.username,
    req.body.password
  );
  res.status(201).send({ userLogin });
});

const putUser = asyncHandler(async (req, res) => {
  const user = await usersModel.putUser(req.params.user_id, req.body);
  console.log(user);
  res.status(202).json({ user });
});

const deleteUser = asyncHandler(async (req, res) => {
  await usersModel.deleteUser(req.params.user_id, req.body.password);
  res.status(204).send();
});

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  putUser,
  deleteUser,
};
