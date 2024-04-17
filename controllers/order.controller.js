const Order = require("../models/order.model.js");
const Cart = require("../models/cart.model.js");
const Address = require("../models/address.model.js");
const stripe = require("stripe")(process.env.STRIPE_SEC);
const User = require("../models/user.model.js");
const { sendNotification } = require("../middlewares/nodemailer/sendMail.js");
const {
  addOrderSchema,
  updatedOrderSchema,
  deletedOrderSchema,
  getOrderSchema,
} = require("../validators/order.validation.js");
const Product = require("../models/product.model.js");

//CREATE
const addOrder = async (req, res) => {
  try {
    const { error } = addOrderSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }
    const userId = req.user._id;
    const user = await User.findById(userId);
    // console.log(user);

    const cart = await Cart.findOne({ userId })
      .populate("items.productId")
      .exec();

    const cartItems = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json("No item in the cart!");
    }

    const addresses = await Address.find({ userId });
    if (!addresses.length) {
      return res.status(404).json("Please add your address to place an order!");
    }
    const deliveryAddressId =
      addresses.find((address) => address.isCurrent === true)?._id ||
      addresses[0]._id;

    // console.log(deliveryAddressId);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: cart.totalPrice,
      currency: cart.items[0].productId.currency,
      // Add any additional options as needed
    });

    if (!paymentIntent) {
      return res.status(400).json("payment not been done !");
    }
    // Create a new order with the paymentIntent id
    // console.log(paymentIntent.client_secret);
    const newOrder = new Order({
      ...req.body,
      deliveryAddressId,
      userId,
      cart: cart,
      items: cartItems.items,
      total: cart.totalPrice,
      paymentToken: paymentIntent.client_secret,
      paymentStatus: "success",
    });

    await newOrder.save();

    // update product collections
    cart.items.forEach(async (item) => {
      const product = await Product.findById(item.productId);
      product.quantity -= item.quantity;
      await product.save();
    });
    await Cart.findByIdAndDelete(cart._id);

    sendNotification(
      process.env.GMAIL_USER,
      user.email,
      "Order confirmed !",
      `You have successfully place an order !`
    );
    res
      .status(201)
      .json({ newOrder, clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json(err.message || "Internal server error!");
  }
};
// update
const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { error } = updatedOrderSchema.validate({ ...req.body, orderId });
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { error } = deletedOrderSchema.validate({ orderId });
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }
    await Order.findByIdAndDelete(orderId);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET single ORDER
const getOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { orderId } = req.params;
    const { error } = getOrderSchema.validate({ ...req.body, orderId });
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }
    const orders = await Order.find({ userId });
    if (orders.length === 0) {
      return res.status(404).json("No order found of current User");
    }
    const singleOrder = orders.find((item) => {
      return item._id.toString() === orderId.toString();
    });

    if (!singleOrder) {
      return res.status(404).json("No order found with given orderId");
    }

    res.status(200).json(singleOrder);
  } catch (err) {
    res.status(500).json(err.message || "Internal server error! ");
  }
};

//GET all ORDERS
const getAllOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId })
      // .populate("items.productId", "deliveryAddressId")
      .populate({
        path: "items.productId",
        model: "Product", // Replace 'Product' with the actual model name for the product
      })
      .populate({
        path: "deliveryAddressId",
        model: "Address", // Replace 'Address' with the actual model name for the address
      })
      .exec();
    if (orders.length === 0) {
      return res.status(404).json("No order found of current User");
    }
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrder,
};
