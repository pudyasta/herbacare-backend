import Joi from "joi";

const registerUservalidation = Joi.object({
  nik: Joi.string().required().max(100),
  name: Joi.string().required().max(100),
  email: Joi.string().required().max(100),
  alamat: Joi.string().required().max(250),
  password: Joi.string().required().max(100),
  token: Joi.string().max(100),
});

const loginValidation = Joi.object({
  email: Joi.string().required().max(100),
  password: Joi.string().required().max(100),
});

export { registerUservalidation, loginValidation };
