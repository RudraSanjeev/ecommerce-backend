const User = require("../models/user.model.js");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {
  generateToken,
  refreshToken,
} = require("../middlewares/jwt/generateToken.js");
// mail gun
const formData = require("form-data");
const Mailgun = require("mailgun.js");

// const nodemailer = require("nodemailer");
dotenv.config();

// mailgun

const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: "api", key: API_KEY });

// register
const register = async (req, res) => {
  try {
    const newUser = new User({
      ...req.body,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SEC),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json("Internal server error" + err);
  }
};

// login
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("No user find with this email");

    const { password, ...otherInfo } = user._doc;
    const originalPassword = CryptoJS.AES.decrypt(
      password,
      process.env.AES_SEC
    ).toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password &&
      res.status(401).json("password doesn't match !");

    const accessToken = generateToken(user);
    const refreshedToken = refreshToken(user);

    res.status(200).json({ ...otherInfo, accessToken, refreshedToken });
  } catch (err) {
    res.status(500).json("Internal server error" + err);
  }
};

// reset
const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json("User not found");
    }

    // Generate a reset token with an expiration (e.g., 1 hour)
    const resetToken = jwt.sign({ _id: user._id }, process.env.JWT_SEC, {
      expiresIn: "10m",
    });

    // Store the reset token in the user's document
    // user.resetToken = resetToken;
    // await user.save();
    // set token in the cookie not in db
    res.cookie("resetToken", resetToken, { httpOnly: true, maxAge: 600000 });

    // Send a reset password email
    // set resetLink to the api route to update new password
    const resetLink = `http://localhost:8000/api/auth/update-password/${resetToken}`;

    // const transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   auth: {
    //     user: process.env.USER_EMAIL,
    //     pass: process.env.USER_PASS,
    //   },
    // });

    // const mailOptions = {
    //   from: email,
    //   // add email address on which you want to send
    //   to: email,
    //   subject: "Password Reset",
    //   text: `Click the following link to reset your password: ${resetLink}`,
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.log(error);
    //     return res.status(500).json("Email could not be sent" + error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //     return res.status(200).json("Password reset email sent");
    //   }
    // });

    // mailgun
    const messageData = {
      from: "sanjeev@rudrainnovative.in",
      to: "sanjeev@rudrainnovative.in", // sent it to email -- first register to
      subject: "Reset password request",
      text: `click to this link to reset your password ${resetLink}`,
    };

    await client.messages.create(DOMAIN, messageData);

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error" + err);
  }
};

// update password
const updatePassword = async (req, res) => {
  try {
    const { token } = req.params;

    // Verify the token from the cookie
    const resetToken = req.cookies.resettoken;

    if (!resetToken) {
      return res.status(401).json("Token not found in cookie");
    }

    const decodedToken = jwt.verify(
      resetToken,
      process.env.JWT_SEC,
      (err, user) => {
        if (err) return res.status(403).json("Token is invalid");
        req.user = user;
      }
    );

    // Find the user using the decoded token
    const user = await User.findById(decodedToken._id);

    if (!user) {
      return res.status(404).json("User not found");
    }

    // Update the user's password
    user.password = CryptoJS.AES.encrypt(
      req.body.newPassword,
      process.env.AES_SEC
    );
    await user.save();

    // You might want to invalidate the token here or mark it as used

    // Respond with a success message
    const messageData = {
      from: "sanjeev@rudrainnovative.in",
      to: "sanjeev@rudrainnovative.in",
      subject: "Password reset successfully...",
      text: "You have reset your password successfully!",
    };

    await client.messages.create(DOMAIN, messageData);
    res.status(200).json("Password reset successful!");
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error" + err);
  }
};
// logout
// const logout = (req, res) => {};

module.exports = { register, login, resetPassword, updatePassword };
