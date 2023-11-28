const {
  verifyToken,
  verifyAndAuthorize,
  verifyAndAdmin,
} = require("../middlewares/jwt/verifyToken");
const Product = require("../models/product.model.js");

const { uploadToCloudinary } = require("../utils/storage.js");

// create
const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

// update - product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

// delete - product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(200).json("Product has been deleted successfully !");
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

// find a product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

// find all product
const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(201).json(products);
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

// search - all product
const searchAllMatchingProduct = async (req, res) => {
  const { keyword } = req.query;

  try {
    const results = await User.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { desc: { $regex: keyword, $options: "i" } },
      ],
    });

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json("Server error " + err);
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
  searchAllMatchingProduct,
};