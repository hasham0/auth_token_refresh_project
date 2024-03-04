import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwtToken.js";

//note: admin rights

const usersDetils = asyncHandler(async (request, response) => {
  const getAllUsers = await User.find({}).select({
    password: 0,
  });
  response.json({ data: getAllUsers });
});

const getUserByID = asyncHandler(async (request, response) => {
  const { _id } = request.params;
  const user = await User.findOne({ _id }).select({ password: 0 });
  if (!user) {
    throw new Error("user not found");
  }
  response.json({
    message: "User found",
    data: user,
  });
});

const deleteUserByID = asyncHandler(async (request, response) => {
  const { _id } = request.params;
  const user = await User.findOne({
    _id,
  });
  if (!user) {
    throw new Error("user not found");
  }
  if (user && user.isAdmin) {
    throw new Error("cannot delete admin user");
  }
  const deleteUser = await User.deleteOne({ _id });
  response.json({
    message: "user delete successfully",
  });
});

const updateUserProfileByID = asyncHandler(async (request, response) => {
  const { _id } = request.params;
  const { username, isAdmin } = request.body;
  /* set validation */
  if ([username, isAdmin].every((item) => item.trim() === "")) {
    throw new Error("please fill all fields");
  }

  const user = await User.findOne({ _id }).select({ password: 0 });
  if (!user) {
    throw new Error("user not found");
  }
  const updateUser = await User.findByIdAndUpdate(
    { _id },
    {
      $set: {
        username: username || user.username,
        isAdmin: isAdmin || user.isAdmin,
      },
    },
    { new: true }
  ).select({ password: 0 });

  response.json({
    message: "User updated",
    data: user,
  });
});

export { getUserByID, updateUserProfileByID, deleteUserByID, usersDetils };
