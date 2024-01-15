const mongoose = require("mongoose");
const Address = require("./address.model.js");
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
    deliveryAddressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: [true, "choose address to make an order !"],
    },
    total: {
      type: Number,
      required: [true, "order must have total value !"],
      default: 0,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "item must have id !"],
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    paymentMode: {
      type: String,
      enum: ["Credit Card", "Debit Card", "Cash on delivery"],
      required: [true, "please one of the method to make payment"],
    },
    paymentToken: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "success"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "successfull", "delivered", "cancelled"],
      // required: [true, "Please make payment to place an order !"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
