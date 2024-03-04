import mongoose, { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

// schema structure
const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: [3, "please provide atleast 3 characters"],
      maxLength: [20],
      require: [true, "please provide the first name"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      minLength: [5, "please provide atleast 5 characters"],
      maxLength: [500],
      require: [true, "please provide the password  "],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// encrypt password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

// compare password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

// pass schema in model
const User = model["User"] || model(`User`, userSchema);

export default User;
