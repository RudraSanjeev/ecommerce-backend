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
    const orders = await Order.find({ userId });
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
