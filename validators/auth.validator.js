const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required().min(3).max(20).message({
    "string.min": "firstname must have at least of {#limit} characters !",
    "string.max": "firstname must have at most of {#limit} characters !",
  }),
  lastName: Joi.string().trim().required().min(3).max(20).message({
    "string.min": "lastname must have at least of {#limit} characters !",
    "string.max": "lastname must have at most of {#limit} characters !",
  }),
  email: Joi.string()
    .trim()
    .email()
    .required()
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .message("invalid email format !"),
  password: Joi.string()
    .trim()
    .min(8)
    .max(20)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .message(
      "Password must have at least one lowercase letter, one uppercase letter, one number, and one special character."
    )
    .required(),
  phoneNumber: Joi.string().trim().length(10).required().messages({
    "string.length": "phone number must have of {#limit} length !",
    "string.required": "phone number is required !",
  }),
  role: Joi.string()
    .trim()
    .valid("admin", "buyer")
    .default("buyer")
    .required()
    .messages({
      "string.valid": "role must have either admin or buyer",
      "string.required": "role is required !",
    }),
  passwordResetToken: Joi.string().trim().default(null),
});

const loginschema = Joi.object({
  email: Joi.string()
    .trim()
    .email()
    .required()
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .message("invalid email format !"),
  password: Joi.string()
    .trim()
    .min(3)
    .max(20)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .message(
      "Password must have at least one lowercase letter, one uppercase letter, one number, and one special character."
    )
    .required(),
});

const resetPasswordSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email()
    .required()
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .message("invalid email format !"),
});

module.exports = {
  registerSchema,
  loginschema,
  resetPasswordSchema,
};
