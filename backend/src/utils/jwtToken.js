import jwt from "jsonwebtoken";
import "dotenv/config";

const generateAccessToken = (data) => {
  return jwt.sign(
    { _id: data._id.toString(), email: data.email },
    process.env.ACCESS_TOKEN_SECRATE_KEY,
    {
      expiresIn: "30d",
    }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRATE_KEY);
};

const generateRefreshToken = (data) => {
  return jwt.sign(
    { _id: data._id.toString() },
    process.env.REFERSH_TOKEN_SECRATE_KEY,
    {
      expiresIn: "1y",
    }
  );
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFERSH_TOKEN_SECRATE_KEY);
};

export {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
