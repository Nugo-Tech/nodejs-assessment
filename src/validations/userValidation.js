import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().allow(""),
  city: Joi.string().allow(""),
  country: Joi.string().allow(""),
});

export const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  address: Joi.string().allow(""),
  city: Joi.string().allow(""),
  country: Joi.string().allow(""),
});
