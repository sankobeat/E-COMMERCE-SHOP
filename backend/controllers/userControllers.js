import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

import { generateToken } from "../utils/generateTokens.js";
// @desc Auth user & get token
// @route POST api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
    // console.log(await bcrypt.compare(password, user.password));
  } else {
    res.status(404);
    throw new Error("invalid email or password");
  }
});

// @desc get user profile
// @route POST api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id);
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// @desc Register User
// @route POST api/users/register
// @access PRIVATE

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const doesUserExist = await User.findOne({ email });
  if (doesUserExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export { authUser, getUserProfile, registerUser };
