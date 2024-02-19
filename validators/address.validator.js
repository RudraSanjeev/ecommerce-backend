const Joi = require("joi");

// add
const addAddressSchema = Joi.object({
  fullName: Joi.string().trim().required().min(3).max(20),
  mobileNumber: Joi.string().trim().required().min(10).max(10),
  houseNo: Joi.string().trim().required().min(3).max(20),
  landmark: Joi.string().trim().required().min(10).max(100),
  city: Joi.string().trim().required().min(3).max(20),
  pincode: Joi.string().trim().length(6).required().messages({
    "string.length": "pincode must have of {#length} char",
    "string.required": "pincode is required !",
  }),
  state: Joi.string().trim().required(),
  country: Joi.string().trim().required(),
});

// update
const updateAddressSchema = Joi.object({
  addressId: Joi.string().trim().length(24).hex().required(),
  houseNo: Joi.string().trim(),
  landmark: Joi.string().trim(),
  city: Joi.string().trim(),
  pincode: Joi.string().trim().length(6),
  state: Joi.string().trim(),
  country: Joi.string().trim(),
  isCurrent: Joi.boolean().default(false),
});

module.exports = {
  addAddressSchema,
  updateAddressSchema,
};
