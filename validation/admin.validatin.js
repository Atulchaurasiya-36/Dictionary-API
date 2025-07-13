import Joi from "joi";

export const adminSchemaValidation = Joi.object({
  adminName: Joi.string().min(3).trim().required().messages({
    "string.empty": "Admin name should not be empty",
    "string.min": "Name should be more than 2 characters"
  }),
  email: Joi.string().email().trim().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format"
  }),
  password: Joi.string().trim().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters"
  })
});
