const Order = require("../models/order.model.js");

//CREATE
const addOrder = async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
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
    const orders = await Order.find({ userId: req.params.userId });
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
