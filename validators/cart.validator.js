const Joi = require("joi");

const addCartSchema = Joi.object({
  items: Joi.object({
    productId: Joi.string().trim().length(24).hex().required(),
    quantity: Joi.number().integer().min(1).max(10).default(1),
  }),
});

const updatedCartSchema = Joi.object({
  productId: Joi.string().trim().length(24).hex().required(),
  quantity: Joi.number().integer().min(1).max(10).default(1),
});

const deletedCartSchema = Joi.object({
  productId: Joi.string().trim().length(24).hex().required(),
});

module.exports = {
  addCartSchema,
  updatedCartSchema,
  deletedCartSchema,
};
