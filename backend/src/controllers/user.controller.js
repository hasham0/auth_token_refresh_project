import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwtToken.js";

//note: User rights
const registerUser = asyncHandler(async (request, response) => {
  const { username, email, password } = request.body;
  /* set validation */
  if ([username, email, password].some((item) => item.trim() === "")) {
    throw {
      message: "please fill all fields",
    };
  }

  /* check user if already existed */
  const isUserExists = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExists) {
    throw {
      statusCode: 401,
      message: "user already existed",
    };
  }

  /* create new user */
  const createNewUser = await User.create({
    username,
    email,
    password,
  });
  const userData = {
    _id: createNewUser._id,
    email: createNewUser.email,
  };
  const accessToken = await generateAccessToken(userData);
  const refreshToken = await generateRefreshToken(userData._id);

  response
    .status(200)
    .cookie(ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .cookie(REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .json({
      message: "user created successfully",
    });
});

const loginUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;

  /* set validation */
  if ([email, password].some((item) => item.trim() === "")) {
    throw {
      message: "please fill all fields",
    };
  }

  /* check user if already existed */
  const isUserExists = await User.findOne({
    email,
  });

  if (!isUserExists) {
    throw {
      status: 401,
      message: "user email not found",
    };
  }

  /* check is password match */
  const isPasswordMatch = await isUserExists.isPasswordCorrect(password);
  if (!isPasswordMatch) {
    throw {
      status: 400,
      message: "password not matched",
    };
  }
  const userData = {
    _id: isUserExists._id,
    email: isUserExists.email,
  };

  const accessToken = await generateAccessToken(userData);
  const refreshToken = await generateRefreshToken(userData._id);

  response
    .status(200)
    .cookie(ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .cookie(REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .json({
      data: userData,
      message: "user login successfully",
    });
});

const logoutUser = asyncHandler(async (request, response) => {
  response
    .status(200)
    .clearCookie(ACCESS_TOKEN)
    .clearCookie(REFRESH_TOKEN)
    .json({
      message: "user logout successfully",
    });
});

const userProfile = asyncHandler(async (request, response) => {
  const { userId } = request;
  const user = await User.findOne({ _id: userId }).select({
    password: 0,
  });
  if (!user) {
    throw {
      status: 400,
      message: "user not found",
    };
  }
  response.json({ data: user });
});

const updateUserProfile = asyncHandler(async (request, response) => {
  const { username, email } = request.body;
  const { userId } = request;

  /* set validation */
  if ([username, email].every((item) => item.trim() === "")) {
    throw {
      message: "please fill all fields",
    };
  }

  /* check user if already existed */
  const user = await User.findById({ _id: userId });
  if (!user) {
    throw {
      status: 400,
      message: "user not found",
    };
  }

  const updateUser = await User.findByIdAndUpdate(
    { _id: userId },
    {
      $set: {
        username: username || user.username,
        email: email || user.email,
      },
    },
    { new: true }
  ).select({ password: 0 });

  // todo:doubtfully recheck
  await updateUser.save({ validateBeforeSave: false });

  response.status(200).json({
    message: "profile updated successfully",
    data: updateUser,
  });
});

const changeUserPassword = asyncHandler(async (request, response) => {
  const { oldPassword, newPassword } = request.body;
  const { userId } = request;

  /* set validation */
  if ([oldPassword, newPassword].some((item) => item.trim() === "")) {
    throw {
      message: "please fill all fields",
    };
  }

  /* check user if already existed */
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw {
      status: 400,
      message: "user not found",
    };
  }

  // check prevoius password
  const verifyOldPassword = await user.isPasswordCorrect(oldPassword);

  if (!verifyOldPassword) {
    throw {
      message: "password not matched",
    };
  }
  if (oldPassword === newPassword) {
    throw {
      message: "new password cannot be same  as old password",
    };
  }
  user.password = newPassword;

  // todo:doubtfull recheck
  await user.save({ validateBeforeSave: true });

  response.status(200).json({
    message: "password updated",
  });
});

const deleteUser = asyncHandler(async (request, response) => {
  const { userId } = request;
  const user = await User.findOne({
    _id: userId,
  });
  if (!user) {
    throw {
      status: 400,
      message: "user not found",
    };
  }
  const deleteUser = await User.findByIdAndDelete({ _id: userId });
  response.status(200).json({
    message: "user delete successfully",
  });
});

// exports
export {
  registerUser,
  loginUser,
  logoutUser,
  userProfile,
  updateUserProfile,
  changeUserPassword,
  deleteUser,
};
