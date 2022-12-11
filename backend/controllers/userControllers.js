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

// @desc update user profile
// @route PUT api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  }
});

// @desc admin get all users
// @route api/users
// @PRIVATE only admins

const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find({});
  if (allUsers) {
    res.status(200).json(allUsers);
  }
});

// @desc delete user
// @route api/users/:id
// @PRIVATE only admins

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User has been removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc get user by id
// @route api/users/:id
// @PRIVATE only admins

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc update user by id
// @route api/users/:id
// @PRIVATE only admins

const updateUserProfileByAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.admin;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUserProfileByAdmin,
};
