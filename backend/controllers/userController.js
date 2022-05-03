const asyncHandler = require("express-async-handler");
const User = require("../schemas/users.schema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    const findUser = await User.findOne({ email: email });
    const findUsername = await User.findOne({ username: username });
    if (findUser) {
      res.status(404);
      throw new Error("Email already exists");
    }
    if (findUsername) {
      res.status(404);
      throw new Error("Username already exists");
    }
    const newPassword = await bcrypt.hash(password, 10);

    await User.create({
      username: username,
      fullName: fullName,
      email: email,
      password: newPassword,
    });
    res.status(201).json({
      status: "User Created!",
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
  const user = await User.findOne({ username: req.body.username });
  console.log(user, "login");
  if (!user) {
    res.status(400);
    throw new Error("Email doesn't exist");
  }
  // res.status(201).json({ status: "OK" });
  console.log(req.body.password, user.password, "password");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  console.log(validPassword, "valid");
  if (validPassword) {
    console.log("inside");
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      "waefgqw4gqregrqegaergre"
    );
    res.json({ status: "OK", token: token, user_id: user.id });
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
  res.status(200).json({ users: users });
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.user_id);
  res.status(200).json({ user: user });
});

module.exports = { registerUser, loginUser, getUsers, getUser };
