const Joi = require("joi");

const addOrderSchema = Joi.object({
  paymentMode: Joi.string()
    .trim()
    .valid("Credit Card", "Debit Card", "Cash on delivery")
    .required(),
  orderStatus: Joi.string()
    .trim()
    .valid("pending", "successfull", "delivered", "cancelled")
    .default("pending"),
});

const updatedOrderSchema = Joi.object({
  orderId: Joi.string().trim().length(24).hex().required(),
  cart: Joi.string().trim().length(24).hex(),
  deliveryAddressId: Joi.string().trim().length(24).hex().required(),
  total: Joi.number().min(1).max(1000000),
  paymentMode: Joi.string()
    .trim()
    .valid("Credit Card", "Debit Card", "Cash on delivery"),
  paymentToken: Joi.string().trim(),
  paymentStatus: Joi.string()
    .trim()
    .valid("pending", "success")
    .default("pending"),
  orderStatus: Joi.string()
    .trim()
    .valid("pending", "successfull", "delivered", "cancelled")
    .default("pending"),
});
const deletedOrderSchema = Joi.object({
  orderId: Joi.string().trim().length(24).hex().required(),
});
const getOrderSchema = Joi.object({
  orderId: Joi.string().trim().length(24).hex().required(),
});

module.exports = {
  addOrderSchema,
  updatedOrderSchema,
  deletedOrderSchema,
  getOrderSchema,
};
