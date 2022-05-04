const asyncHandler = require("express-async-handler");
const User = require("../schemas/users.schema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errors = require("../errors/errorHandler.js");
//
//  POST /api/users/register
//
exports.createNewUser = async (userInfo) => {
  const newUser = await _validateNewUser(userInfo);
  const newPassword = await bcrypt.hash(newUser.password, 10);

  return await User.create({ ...newUser, password: newPassword });
};
//
//  GET /api/users
//
exports.getAllUsers = async () => {
  return await User.find({});
};
//
//  GET /api/users/:user_id
//
exports.getUserById = async (userId) => {
  const user = await User.findById(userId);

  if (!user) return Promise.reject(errors.errMsg_idNotFound);

  return user;
};
//
//  POST /api/users/login
//
exports.loginUser = async (username, password) => {

  const user = await User.findOne({ username });
  
  if (!user) {
    return Promise.reject(errors.errMsg_invalidItem("username"));
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return Promise.reject(errors.errMsg_invalidItem("password"));
  }

  const token = jwt.sign(
    {
      name: user.username,
      email: user.email,
    },
    "waefgqw4gqregrqegaergre"
  );

  return { token: token, user_id: user.id };
};
//
//  PUT /api/users/:user_id
//
exports.putUser = async (userId, userInfo) => {
  const user = await User.findById(userId);

  if (!user) {
    console.log("hi");
    return Promise.reject(errors.errMsg_idNotFound);
  }

  const filter = {
    username: user.username,
    fullName: user.fullName,
    email: user.email,
    password: user.password,
  };

  const update = {
    address: userInfo.address,
    phoneNumber: userInfo.phoneNumber,
    img: userInfo.img,
  };

  const updatedUser = await User.findOneAndUpdate(filter, update, {
    new: true,
  });

  return updatedUser;
};
//
//  DELETE /api/users/:user_id
//
exports.deleteUser = async (userId, password) => {
  const user = await User.findById(userId);

  const user = await User.findById(userId);

  if (!user){
      return Promise.reject(errors.errMsg_idNotFound);
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword){
      return Promise.reject(errors.errMsg_invalidItem('password'));
  }

  const res = await User.deleteOne({ _id: userId });

  if (!res.acknowledged) {
    return Promise.reject(errors.errMsg_generic);
  }
};

const _validateNewUser = async (userInfo) => {
  const keys = ["username", "fullName", "email", "password"];
  const newUser = {};

  // copy only relevant fields to new object, reject if any empty
  for (const key of keys) {
    if (!userInfo[key]) return Promise.reject(errors.errMsg_invalidPostObj);

    newUser[key] = userInfo[key];
  }

  const [userExists, usernameExists] = await Promise.all([
    User.findOne({ email: userInfo.email }),
    User.findOne({ username: userInfo.username }),
  ]);

  if (userExists || usernameExists) {
    return Promise.reject(
      errors.errMsg_uniqueFieldExists(userExists ? "Username" : "Email")
    );
  }

  return newUser;
};
