import Joi from "joi";

const registerUservalidation = Joi.object({
  name: Joi.string().required().max(100),
  email: Joi.string().required().max(100),
  address: Joi.string().required().max(100),
  password: Joi.string().required().max(100).min(6),
  ttl: Joi.date().required(),
});

const loginValidation = Joi.object({
  email: Joi.string().required().max(100),
  password: Joi.string().required().max(100),
});

export { registerUservalidation, loginValidation };
