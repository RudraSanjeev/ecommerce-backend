const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required !"],
      trim: true,
      minLength: [3, "lastname must be atleast of 3 character"],
      maxLength: [20, "lastname must be at most of 20 character"],
    },
    lastName: {
      type: String,
      required: [true, "lastname is required !"],
      trim: true,
      minLength: [3, "lastname must be atleast of 3 character"],
      maxLength: [20, "lastname must be at most of 20 character"],
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
      required: [true, "please select your role !"],
    },
    passwordResetToken: {
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
