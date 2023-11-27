const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    houseNo: {
      type: String,
      required: [true, "Please enter your house name/no"],
    },
    landmark: {
      type: String,
      required: [true, "Please enter your nearby locality !"],
    },
    city: {
      type: String,
      required: [true, "Please enter your city name !"],
    },
    pincode: {
      type: String,
      required: [true, "Please enter valid pin code !"],
      minLength: [6, "Pincode must be of length 6"],
      maxLength: [6, "Pincode must be of length 6"],
    },
    state: {
      type: String,
      required: [true, "Please enter your state name !"],
    },
    country: {
      type: String,
      required: [true, "Please enter your country name !"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
