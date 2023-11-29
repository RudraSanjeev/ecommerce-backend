const Cart = require("../models/cart.model.js");
const User = require("../models/user.model.js");
const Product = require("../models/product.model.js");

// Create a new cart or update existing cart
const addCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Condition 1: Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("user not found !");
    }

    // Condition 2: Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json("Product not found !");
    }

    // Condition 3: Check if quantity is available
    if (quantity > product.quantity) {
      return res.status(400).json("Insufficient product quantity !");
    }

    // Condition 4: Check if the user already has a cart
    let cart = await Cart.findOne({ userId });

    // If no cart exists, create a new one
    if (!cart) {
      cart = new Cart({ userId, items: [], total: 0 });
    }

    // Condition 5: Check if the product is already in the cart
    const existingItem = cart.items.find((item) =>
      item.productId.equals(productId)
    );

    if (existingItem) {
      // If the item exists, increase the quantity
      existingItem.quantity += quantity;
    } else {
      // If the item does not exist, add it to the cart
      cart.items.push({ productId, quantity });
    }

    // Update total by calculating the sum of each item's total
    cart.total = cart.items.reduce((acc, item) => {
      const product = product.find((p) => p.productId.equals(item.productId));
      return acc + item.quantity * product.price; // Assuming each product has a "price" field
    }, 0);

    // Save the updated cart
    await cart.save();

    // update product doc
    await Product.findByIdAndUpdate(productId, {
      $inc: { quantity: -quantity },
    });

    res.status(200).json(cart);
  } catch (err) {
    // console.error(err);
    res.status(500).json(err.message || "Internal Server Error !");
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
    res.status(500).json(err.message);
  }
};

//DELETE
const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.cartId);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err.message);
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
