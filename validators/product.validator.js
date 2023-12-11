const Joi = require("joi");

// add
const addProductSchema = Joi.object({
  title: Joi.string().trim().required().min(3).max(20).messages({
    "string.required": "title is required !",
    "string.min": "title should be at least 3 char !",
    "string.max": "title should be at most 20 char !",
  }),

  desc: Joi.string().trim().required().min(5).max(100).messages({
    "string.required": "desc is required !",
    "string.min": "desc should be at least {#limit} char !",
    "string.max": "desc should be at most {#limit} char !",
  }),

  img: Joi.array().items(Joi.string().trim()).min(1).max(8).messages({
    "array.min": "img should be at least {#limit} !",
    "array.max": "img should be at most {#limit} !",
  }),

  currency: Joi.string()
    .trim()
    .valid("INR", "USD", "EUR")
    .default("INR")
    .required()
    .messages({
      "string.required": "currency is required !",
      "string.valid": "currency must be among INR, USD or EUR !",
    }),

  price: Joi.number().min(1).max(10000000).required().messages({
    "number.required": "price is required !",
    "number.min": "price should be at least {#limit}  !",
    "number.max": "price should be at most {#limit} !",
  }),

  quantity: Joi.number().required().min(1).max(1000).messages({
    "number.required": "quantity is required !",
    "number.min": "price should be at least {#limit}  !",
    "number.max": "price should be at most {#limit} !",
  }),

  category: Joi.array().items(Joi.string().trim()).min(1).max(5).messages({
    "array.min": "category should be at least {#limit} !",
    "array.max": "category should be at most {#limit} !",
  }),

  size: Joi.array().items(Joi.string().trim()).min(1).max(5).messages({
    "array.min": "size should be at least {#limit} !",
    "array.max": "size should be at most {#limit} !",
  }),

  color: Joi.array().items(Joi.string().trim()).min(1).max(5).messages({
    "array.min": "color should be at least {#limit} !",
    "array.max": "color should be at most {#limit} !",
  }),

  inStock: Joi.boolean().default(true),
});

// update
const updateProductSchema = Joi.object({
  productId: Joi.string().trim().length(24).hex().required(),

  title: Joi.string().trim().min(3).max(20).messages({
    "string.min": "title should be at least 3 char !",
    "string.max": "title should be at most 20 char !",
  }),

  desc: Joi.string().trim().min(5).max(100).messages({
    "string.min": "desc should be at least {#limit} char !",
    "string.max": "desc should be at most {#limit} char !",
  }),

  img: Joi.array().items(Joi.string().trim()).min(1).max(8).messages({
    "array.min": "img should be at least {#limit} !",
    "array.max": "img should be at most {#limit} !",
  }),

  currency: Joi.string().trim().valid("INR", "USD", "EUR").default("INR"),

  price: Joi.number().min(1).max(10000000).messages({
    "number.min": "price should be at least {#limit}  !",
    "number.max": "price should be at most {#limit} !",
  }),

  quantity: Joi.number().min(1).max(1000).messages({
    "number.min": "price should be at least {#limit}  !",
    "number.max": "price should be at most {#limit} !",
  }),

  category: Joi.array().items(Joi.string().trim()).min(1).max(5).messages({
    "array.min": "category should be at least {#limit} !",
    "array.max": "category should be at most {#limit} !",
  }),

  size: Joi.array().items(Joi.string().trim()).min(1).max(5).messages({
    "array.min": "size should be at least {#limit} !",
    "array.max": "size should be at most {#limit} !",
  }),

  color: Joi.array().items(Joi.string().trim()).min(1).max(5).messages({
    "array.min": "color should be at least {#limit} !",
    "array.max": "color should be at most {#limit} !",
  }),

  inStock: Joi.boolean().default(true),
});

// delete
const deleteProductSchema = Joi.object({
  productId: Joi.string().trim().length(24).hex().required().messages({
    "string.length": "Product ID should be exactly 24 characters long!",
    "string.hex": "Product ID should be a hexadecimal value!",
    "any.required": "Product ID is required!",
  }),
});

const getProductSchema = Joi.object({
  productId: Joi.string().trim().length(24).hex().required().messages({
    "string.length": "Product ID should be exactly 24 characters long!",
    "string.hex": "Product ID should be a hexadecimal value!",
    "any.required": "Product ID is required!",
  }),
});

const searchAllMatchingProductSchema = Joi.object({
  keyword: Joi.string().trim().min(1).max(50).required().messages({
    "string.min": "Keyword should be at least {#limit} character!",
    "string.max": "Keyword should be at most {#limit} characters!",
    "any.required": "Keyword is required!",
  }),
});

module.exports = {
  addProductSchema,
  updateProductSchema,
  deleteProductSchema,
  getProductSchema,
  searchAllMatchingProductSchema,
};
