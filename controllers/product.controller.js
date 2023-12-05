const Product = require("../models/product.model.js");
const path = require("path");
const imageUrl = require("../utils/storage.js");
const {
  addProductSchema,
  updateProductSchema,
  deleteProductSchema,
  getProductSchema,
  searchAllMatchingProductSchema,
} = require("../validators/product.validator.js");
// create
const addProduct = async (req, res) => {
  try {
    const { error } = addProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }

    const imagePath = path.join(__dirname, "../utils/assets/nikeShoes.webp");
    // here you can make multiple imagePath and pass as an array
    const images = await imageUrl(imagePath);

    const product = new Product({ ...req.body, img: [images] });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

// update - product
const updateProduct = async (req, res) => {
  try {
    const { error } = updateProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
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
    const { error } = deleteProductSchema.validate(req.params.productId);
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }
    await Product.findByIdAndDelete(req.params.productId);
    res.status(200).json("Product has been deleted successfully !");
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

// find a product
const getProduct = async (req, res) => {
  try {
    const { error } = getProductSchema.validate(req.params.productId);
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }
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

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

// search - all product
const searchAllMatchingProduct = async (req, res) => {
  const { error } = searchAllMatchingProductSchema.validate(req.query.keyword);
  if (error) {
    return res.status(400).json(error.message || "Bad request !");
  }
  const { keyword } = req.query;

  try {
    const results = await Product.find({
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
