const User = require("../models/user.model.js");
const Address = require("../models/address.model.js");
const {
  addAddressSchema,
  updateAddressSchema,
} = require("../validators/address.validator.js");
const { mongoose } = require("mongoose");

// add
const addAddress = async (req, res) => {
  try {
    console.log(req.body.formData);
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
    res.status(500).json(err || "Internal server error !");
  }
};

const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const { error } = updateAddressSchema.validate({ ...req.body, addressId });
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }
    const userId = req.user._id;
    const addresses = await Address.find({ userId });
    if (!addresses) {
      return res.status(404).json("address not found !");
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      { _id: addressId },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedAddress);
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};
const updateCurrentAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const { error } = updateAddressSchema.validate({ addressId });
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }
    const userId = req.user._id;
    const addresses = await Address.find({ userId });
    if (!addresses.length) {
      return res.status(404).json("address not found !");
    }

    // Update all addresses to set isCurrent to false
    await Address.updateMany({ userId }, { $set: { isCurrent: false } });

    // Set the isCurrent of the specific address to true
    const currentAddress = await Address.findOneAndUpdate(
      { userId, _id: addressId },
      { $set: { isCurrent: true } },
      { new: true }
    );
    res.status(200).json(currentAddress);
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

const deleteAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { addressId } = req.params;
    const addresses = await Address.find({ userId });
    if (!addresses) {
      return res.status(404).json("No address found with given userId");
    }
    const { error } = updateAddressSchema.validate({ addressId });
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }

    await Address.findByIdAndDelete(addressId);
    res.status(200).json("Address deleted successfully !");
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

// get single address
const getAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { addressId } = req.params;
    const { error } = updateAddressSchema.validate({ addressId });
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }
    const addresses = await Address.find({ userId });
    if (!addresses) {
      return res.status(404).json("No address found with given ID !");
    }
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};
const getCurrentAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const address = await Address.findOne({ userId, isCurrent: true });
    if (!address) {
      return res.status(404).json("No address found of this user!");
    }
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
  updateCurrentAddress,
  deleteAddress,
  getAddress,
  getCurrentAddress,
  getAllAddressOfUser,
};
