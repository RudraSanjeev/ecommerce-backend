const Joi = require("joi");

const addWishListSchema = Joi.object({
  items: Joi.object({
    productId: Joi.string().trim().length(24).hex().required(),
  }).required(),
});

const updateWishlistSchema = Joi.object({
  productId: Joi.string().trim().length(24).hex().required(),
});

module.exports = {
  addWishListSchema,
  updateWishlistSchema,
};
