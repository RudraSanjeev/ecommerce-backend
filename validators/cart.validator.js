const Joi = require("joi");

const addCartSchema = Joi.object({
  items: Joi.object({
    productId: Joi.string().trim().length(24).hex().required(),
    quantity: Joi.number().integer().min(1).required(),
  }).required(),
});

const updatedCartSchema = Joi.object({
  productId: Joi.string().trim().length(24).hex().required(),
  quantity: Joi.number().integer().min(1).required(),
});

const deletedCartSchema = Joi.object({
  cartId: Joi.string().trim().length(24).hex().required(),
});

module.exports = {
  addCartSchema,
  updatedCartSchema,
  deletedCartSchema,
};
