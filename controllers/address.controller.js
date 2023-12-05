const User = require("../models/user.model.js");
const Address = require("../models/address.model.js");
const {
  addAddressSchema,
  updateAddressSchema,
} = require("../validators/address.validator.js");
const addAddress = async (req, res) => {
  try {
    const { error } = addAddressSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }
    const userId = req.user._id;
    const newAddress = new Address({ ...req.body, userId });

    const existingAddress = await Address.findOne({
      userId,
      houseNo: req.body.houseNo,
    });
    if (existingAddress) {
      return res.status(400).json("Allready this address is saved ! ");
    }
    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

const updateAddress = async (req, res) => {
  try {
    const { error } = updateAddressSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }
    const userId = req.user._id;
    const address = await Address.findOne({ userId });
    if (!address) {
      return res.status(404).json("address not found !");
    }
    const { _id } = address;

    const updatedAddress = await Address.findByIdAndUpdate(
      _id,
      { $set: req.body },
      { new: true }
    );

    res.status(201).json(updatedAddress);
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

const deleteAddress = async (req, res) => {
  try {
    const userId = req.user._id;

    const address = await Address.findOne({ userId });
    if (!address) {
      return res.status(404).json("No address found with given userId");
    }
    const { _id } = address;
    await Address.findByIdAndDelete(_id);
    res.status(200).json("Address deleted successfully !");
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

// get single address
const getAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const address = await Address.findOne({ userId });
    res.status(200).json(address);
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

// get address
const getAllAddressOfUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const addresss = await Address.find({ userId });
    res.status(200).json(addresss);
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

module.exports = {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddress,
  getAllAddressOfUser,
};
