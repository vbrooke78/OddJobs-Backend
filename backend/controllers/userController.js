const asyncHandler = require("express-async-handler");
const User = require("../schemas/users.schema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersModel = require('../models/users.models.js');

const registerUser = asyncHandler(async (req, res) => {

  const user = await usersModel.createNewUser(req.body);
  res.status(201).send({user});
});

const getUsers = asyncHandler(async (req, res) => {

  const users = await usersModel.getAllUsers();
  res.status(200).json({users});
});

const getUser = asyncHandler(async (req, res) => {

  const user = await usersModel.getUserById(req.params.user_id);
  res.status(200).json({user});
});


const loginUser = asyncHandler(async (req, res) => {
  //   try {
  const user = await User.findOne({ email: req.body.email });
  // console.log(user);
  if (!user) {
    res.status(400);
    throw new Error("Email doesn't exist");
  }
  // console.log(req.body.password, `web`);
  // console.log(user.password, `back`);
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword) {
    const token = jwt.sign(
      {
        name: user.username,
        email: user.email,
      },
      "waefgqw4gqregrqegaergre"
    );

    return res.json({ status: "OK", token: token, user_id: user.id });
  } else {
    res.status(400);
    throw new Error("Wrong password");
  }
  //   } catch (error) {
  //     res.status(400);
  //     throw new Error("error");
  //   }
});


const deleteUser = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const user = await User.findById(req.params.user_id);
  const validPassword = await bcrypt.compare(password, user.password);
  // console.log(password, user.password, "passwords");
  if (validPassword) {
    await user.remove();
    res.status(202).json({ status: "User deleted" });
  }
});

const putUser = asyncHandler(async (req, res) => {
  const { address, phoneNumber, img } = req.body;
  const user = User.findById(req.params.user_id);
  const { username, fullName, email, password } = req.body;
  console.log(req.body, "PUT");
  if (!user) {
    res.status(400);
    throw new Error("user doesn't exist");
  }
  const filter = {
    username: username,
    fullName: fullName,
    email: email,
    password: password,
  };
  let updateAddress;
  if (address) {
    updateAddress = [
      {
        city: address.city,
        street: address.street,
        postCode: address.postCode,
      },
    ];
  }
  let updatePhoneNumber;
  if (phoneNumber) updatePhoneNumber = phoneNumber;
  let updateImg;
  if (img) updateImg = img;
  const update = {
    address: updateAddress,
    phoneNumber: updatePhoneNumber,
    img: updateImg,
  };

  await User.findOneAndUpdate(filter, update, {
    new: true,
  });
  res.status(202).json({ status: "User details updated!" });
});

module.exports = { registerUser, loginUser, getUsers, getUser, putUser, deleteUser };

