import User from "../models/user.model.js";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "./jwtToken.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const regenerateTokens = asyncHandler(async (request, response) => {
  const getRefreshToken =
    request.cookies[REFRESH_TOKEN] ||
    (request.headers.cookie &&
      request.headers.cookie.split("; ")[1].split("=")[1]);

  // Check if there's a refresh token available
  if (!getRefreshToken) {
    throw { message: "refresh token not found" };
  }

  // Verify the refresh token
  const verifyMyRefreshToken = await verifyRefreshToken(getRefreshToken);

  // If the refresh token is valid, proceed to generate new tokens
  if (verifyMyRefreshToken) {
    const user = await User.findOne({ _id: verifyMyRefreshToken._id });
    if (!user) {
      throw { message: "user  not found" };
    }
    const userData = {
      _id: user._id,
      email: user.email,
    };

    response.clearCookie(ACCESS_TOKEN).clearCookie(REFRESH_TOKEN);

    // Generate new access and refresh tokens
    const newAccessToken = await generateAccessToken(userData);
    const newRefreshToken = await generateRefreshToken(userData._id);

    // Set the new tokens in the response cookies
    return response
      .status(200)
      .cookie(ACCESS_TOKEN, newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .cookie(REFRESH_TOKEN, newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "tokens refresh successfully",
      });
  }
});
export default regenerateTokens;
