const Cart = require("../models/cart.model.js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//CREATE

const addCart = async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE
const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.cartId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE
const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.cartId);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET USER CART
const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};
//GET ALL USER CART
const getAllUserCart = async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

// //GET ALL CART
const getAllCart = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllUserCart,
  getAllCart,
};
