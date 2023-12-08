const Cart = require("../models/cart.model.js");
const User = require("../models/user.model.js");
const Product = require("../models/product.model.js");
const {
  addCartSchema,
  updatedCartSchema,
  deletedCartSchema,
} = require("../validators/cart.validator.js");
// add
const addCart = async (req, res) => {
  try {
    const { error } = addCartSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }
    const userId = req.user._id;

    const productId = req.body.items.productId;
    const quantity = req.body.items.quantity;

    if (!productId || !quantity) {
      return res.status(400).json({
        error: `User ID, Product ID, and Quantity are required.${userId}, ${productId}, ${quantity} `,
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json("Product not found with given id !");
    }

    if (quantity > product.quantity) {
      return res.status(400).json("Insufficient product quantity !");
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      const price = product.price * quantity;
      cart = new Cart({ ...req.body, userId, totalPrice: price });
      await cart.save();

      // updating product collection.
      product.quantity -= quantity;
      await product.save();
      return res.status(201).json(cart);
    }
    // Check if the product is already in the cart
    const existingItem = cart.items.find((item) =>
      item.productId.equals(productId)
    );

    if (!existingItem) {
      cart.items.push({ productId, quantity });
      cart.totalPrice += product.price * quantity;
      await cart.save();

      // updating product collection.
      product.quantity -= quantity;
      await product.save();
      return res.status(201).json(cart);
    }

    existingItem.quantity += quantity;
    cart.totalPrice += product.price * quantity;
    await cart.save();

    // updating product collection.
    product.quantity -= quantity;
    await product.save();
    res.status(201).json(cart);
  } catch (error) {
    // console.error(error);
    res.status(500).json(error.message || "Internal Server Error");
  }
};

// update
const updatedCart = async (req, res) => {
  try {
    const { error } = updatedCartSchema.validate(req.params.productId);
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }

    // const cartId = req.params.cartId;
    const productId = req.params.productId;
    const quantity = req.body.quantity;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json("No cart found with the given cart id");
    }

    const existingItem = cart.items.find((item) =>
      item.productId.equals(productId)
    );

    if (!existingItem) {
      return res
        .status(404)
        .json("No product found in the cart with the given product id");
    }

    const product = await Product.findById(productId);
    if (quantity > existingItem.quantity) {
      return res
        .status(400)
        .json("given quantity is greator than cart quantity !");
    }
    existingItem.quantity -= quantity;
    cart.totalPrice -= product.price * quantity;

    await cart.save();

    // updating product collection.
    product.quantity += quantity;
    await product.save();
    if (cart.totalPrice === 0) {
      await Cart.findByIdAndDelete(cart._id);
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message || "Internal server error");
  }
};

// delete cart
const deletedCart = async (req, res) => {
  try {
    const { error } = deletedCartSchema.validate(req.params.cartId);
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }
    const cartId = req.params.cartId;
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });
    cart.items.forEach(async (item) => {
      const productId = item.productId;
      const quantity = item.quantity;
      const product = await Product.findById(productId);
      product.quantity += quantity;
      await product.save();
    });
    await Cart.findByIdAndDelete(cartId);

    res.status(200).json("cart has been deleted successfully !");
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

// get a single cart
const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json("cart not found !");
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

// get all cart
const getAllCart = async (req, res) => {
  try {
    const carts = await Cart.find();
    if (!carts) {
      return res.status(404).json("Cart not found !");
    }

    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

module.exports = {
  addCart,
  updatedCart,
  deletedCart,
  getCart,
  getAllCart,
};
