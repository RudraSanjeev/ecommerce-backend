const Order = require("../models/order.model.js");
const Cart = require("../models/cart.model.js");
const Address = require("../models/address.model.js");
const stripe = require("stripe")(process.env.STRIPE_SEC);
const User = require("../models/user.model.js");
const { sendNotification } = require("../middlewares/nodemailer/sendMail.js");

//CREATE
const addOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    // console.log(user);

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).json("No item in the cart!");
    }

    const address = await Address.findOne({ userId });

    if (!address) {
      return res.status(404).json("Please add your address to place an order!");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: cart.totalPrice,
      currency: cart.items[0].productId.currency,
      // Add any additional options as needed
    });

    if (!paymentIntent) {
      return res.status(400).json("payment not been done !");
    }
    // Create a new order with the paymentIntent id
    const newOrder = new Order({
      ...req.body,
      userId,
      cart: cart._id,
      total: cart.totalPrice,
      paymentToken: paymentIntent.id,
      paymentStatus: "success",
    });

    await newOrder.save();
    await Cart.findByIdAndDelete(cart._id);

    sendNotification(
      process.env.GMAIL_USER,
      user.email,
      "Order confirmed !",
      `You have successfully place and order !`
    );
    res
      .status(201)
      .json({ newOrder, cart, clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json(err.message || "Internal server error!");
  }
};

const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
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
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET USER ORDERS
const getUserOrderByOrderId = async (req, res) => {
  try {
    const orders = await Order.findOne({ _id: req.params.orderId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET USER ORDERS
const getUserOrderByUserId = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.findOne({ userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL
const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addOrder,
  updateOrder,
  deleteOrder,
  getUserOrderByOrderId,
  getUserOrderByUserId,
  getAllOrder,
};
