const mongoose = require("mongoose");
const addressSchema = require("./address.model.js");
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user id must be there !"],
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: [true, "must have cart here !"],
    },
    total: {
      type: Number,
      required: [true, "order must have total value !"],
      default: 0,
    },
    address: {
      type: addressSchema,
      required: [true, "order must have address !"],
    },
    paymentMode: {
      type: String,
      enum: ["Credit Card", "Debit Card", "Cash on delivery"],
      required: [true, "please one of the method to make payment"],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "success"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "successfull", "delivered", "cancelled"],
      required: [true, "Please make payment to place an order !"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.module("Order", orderSchema);
