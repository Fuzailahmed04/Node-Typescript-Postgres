import Joi from 'joi';

export const userValidationSchemas = {
  registerUserValidation: Joi.object({
    username: Joi.string()
      .min(3)
      .required()
      .messages({
        "string.base": "username must be a string.",
        "string.empty": "username cannot be empty.",
        "string.min": "username must be at least 3 characters long.",
        "any.required": "username is required.",
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
   
  })
  
};