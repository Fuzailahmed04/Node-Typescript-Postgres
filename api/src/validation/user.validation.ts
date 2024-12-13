import Joi from 'joi';

// Validation schema for user registration
export const userValidationSchemas = {
  registerUserValidation: Joi.object({
    username: Joi.string()
      .min(3)
      .required()
      .messages({
        "string.base": "Username must be a string.",
        "string.empty": "Username cannot be empty.",
        "string.min": "Username must be at least 3 characters long.",
        "any.required": "Username is required.",
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.base": "Email must be a string.",
        "string.empty": "Email cannot be empty.",
        "string.email": "Please provide a valid email address.",
        "any.required": "Email is required.",
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        "string.base": "Password must be a string.",
        "string.empty": "Password cannot be empty.",
        "string.min": "Password must be at least 6 characters long.",
        "any.required": "Password is required.",
      }),
  }),

  // Validation schema for user login
   loginUser: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.base": "Email must be a string.",
        "string.empty": "Email cannot be empty.",
        "string.email": "Please provide a valid email address.",
        "any.required": "Email is required.",
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        "string.base": "Password must be a string.",
        "string.empty": "Password cannot be empty.",
        "string.min": "Password must be at least 6 characters long.",
        "any.required": "Password is required.",
      }),
    // user_id: Joi.number()
    //   .required()
    //   .messages({
    //     "number.base": "User ID must be a number.",
    //     "any.required": "User ID is required.",
    //   }),
  })
  
};
