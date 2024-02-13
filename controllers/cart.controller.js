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
    const userId = req.user._id;

    const { productId, quantity } = req.body.items;
    const { error } = addCartSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
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

      return res.status(201).json(cart);
    }
    // Check if the product is already in the cart
    const existingItem = cart.items.find(
      (item) =>
        // item.productId.equals(productId)
        item.productId.toString() === productId.toString()
    );

    if (!existingItem) {
      cart.items.push({ productId, quantity });
      cart.totalPrice += product.price * quantity;
      await cart.save();

      return res.status(201).json(cart);
    }

    existingItem.quantity += quantity;
    cart.totalPrice += product.price * quantity;
    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error");
  }
};

// update
const updatedCart = async (req, res) => {
  try {
    // const cartId = req.params.cartId;
    const productId = req.params.productId;
    const quantity = req.body.items.quantity;
    const userId = req.user._id;
    if (!quantity) {
      return res.status(400).json("Quantity is missing !");
    }

    const { error } = updatedCartSchema.validate({
      productId: req.params.productId,
      quantity,
    });
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json("No cart found with the given user id");
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId.toString()
    );

    if (!existingItem) {
      return res
        .status(404)
        .json("No product found in the cart with the given product id");
    }

    const product = await Product.findById(productId);
    if (quantity > product.quantity) {
      return res
        .status(400)
        .json("given quantity is greator than product quantity !");
    }
    const quantityChange = quantity - existingItem.quantity;
    cart.totalPrice += quantityChange * product.price;
    existingItem.quantity = quantity;
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    // console.error(err);
    res.status(500).json(err.message || "Internal server error");
  }
};

// delete cart
const deletedCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { error } = deletedCartSchema.validate({ productId });
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!existingItem) {
      return res.status(404).json("No item found with given productId");
    }
    const deletedProduct = await Product.findOne({ _id: productId });
    const deletedProductPrice = deletedProduct.price;
    let deletedProductQuantity = 1;
    cart.items = cart.items.filter((item) => {
      if (item.productId.toString() == productId.toString()) {
        deletedProductQuantity = item.quantity;
      }
      return item.productId.toString() !== productId.toString();
    });
    cart.totalPrice =
      cart.totalPrice - deletedProductQuantity * deletedProductPrice;
    await cart.save();

    res
      .status(200)
      .json("Product has been deleted from the cart successfully !");
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

// get all cart
const getAllCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId })
      .populate("items.productId")
      .exec();
    if (!cart) {
      return res.status(404).json("Cart not found !");
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

module.exports = {
  addCart,
  updatedCart,
  deletedCart,
  // getCart,
  getAllCart,
};
