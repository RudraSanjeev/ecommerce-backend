const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter title of the product !"],
  },
  desc: {
    type: String,
    required: [true, "Please enter description of the product !"],
  },
  img: [
    {
      type: String,
      required: [true, "Please add at lease one image url !"],
    },
  ],
  currency: {
    type: String,
    enum: ["INR", "USD", "EURO"],
    default: "INR",
  },
  price: {
    type: Number,
    required: [true, "Product must have price !"],
  },
  quantity: {
    type: Number,
    required: [true, "Product must have quantity !"],
  },
  category: {
    type: Array,
  },
  size: {
    type: Array,
  },
  color: {
    type: Array,
  },
  inStock: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
