const Joi = require("joi");

// add
const addAddressSchema = Joi.object({
  houseNo: Joi.string().trim().required(),
  landmark: Joi.string().trim().required(),
  city: Joi.string().trim().required(),
  pincode: Joi.string().trim().length(6).required().messages({
    "string.length": "pincode must have of {#length} char",
    "string.required": "pincode is required !",
  }),
  state: Joi.string().trim().required(),
  country: Joi.string().trim().required(),
});

// update
const updateAddressSchema = Joi.object({
  houseNo: Joi.string().trim(),
  landmark: Joi.string().trim(),
  city: Joi.string().trim(),
  pincode: Joi.string().trim().length(10),
  state: Joi.string().trim(),
  country: Joi.string().trim(),
});

module.exports = {
  addAddressSchema,
  updateAddressSchema,
};
