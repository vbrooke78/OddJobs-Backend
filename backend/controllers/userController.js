const asyncHandler = require("express-async-handler");
const User = require("../models/users.models.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // console.log(req);
    const findUser = await User.findOne({ email: email });
    // console.log(findUser);
    if (findUser) {
      res.status(404);
      throw new Error("email exists");
    }

    const newPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: newPassword,
    });
    res.status(201).json({
      status: "OK",
    });
  } catch (error) {
    res.status(400);
    throw new Error("Email already exists!");
  }
});
//
//
//
//
const loginUser = asyncHandler(async (req, res) => {
  //   try {
  const user = await User.findOne({ email: req.body.email });
  // console.log(user);
  if (!user) {
    res.status(400);
    throw new Error("Email doesn't exist");
  }
  console.log(req.body.password, `web`);
  console.log(user.password, `back`);
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword) {
    const token = jwt.sign(
      {
        name: user.firstName,
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

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ users: req.body });
  res.status(200).json(users);
});

module.exports = { registerUser, loginUser, getUsers };
