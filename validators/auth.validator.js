const Joi = require("joi");

const registerSchema = Joi.object({
  fullName: Joi.string().trim().required().min(3).max(20).message({
    "string.min": "fullName must have at least of {#limit} characters !",
    "string.max": "fullName must have at most of {#limit} characters !",
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
  role: Joi.string().trim().valid("admin", "buyer").default("buyer").messages({
    "string.valid": "role must have either admin or buyer",
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
const updatePasswordSchema = Joi.object({
  password: Joi.string()
    .trim()
    .required()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .message("invalid password format !"),
});
const refreshAccessTokenShema = Joi.object({
  refreshToken: Joi.string().trim().required(),
});

module.exports = {
  registerSchema,
  loginschema,
  resetPasswordSchema,
  updatePasswordSchema,
  refreshAccessTokenShema,
};
