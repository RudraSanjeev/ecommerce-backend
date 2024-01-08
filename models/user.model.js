const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullName is required !"],
      trim: true,
      minLength: [3, "fullName must be atleast of 3 character"],
      maxLength: [20, "fullName must be at most of 20 character"],
    },
    email: {
      type: String,
      required: [true, "email is required !"],
      trim: true,
      unique: [true, "user already exist with this email !"],
    },
    password: {
      type: String,
      required: [true, "password is required !"],
      minlength: [8, "password must be at least of 8 character"],
      // maxlength: [20, "password must be at most of 20 character"],
    },
    phoneNumber: {
      type: String,
      minlength: 10,
      maxlength: 10,
      required: true,
      unique: [true, "user already exist with this phone number !"],
    },
    role: {
      type: String,
      enum: ["admin", "buyer"],
      default: "buyer",
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
