import Joi from "joi";

const createKlinikValidation = Joi.object({
  klinik_name: Joi.string().required().max(100),
  klinik_address: Joi.string().required(),
  klinik_phone: Joi.string().required().max(14),
  klinik_email: Joi.string().required().max(30),
  password: Joi.string().required().min(6),
  klinik_description: Joi.string().required(),
  klinik_open: Joi.string().required(),
  klinik_close: Joi.string().required(),
});
const loginKlinikValidation = Joi.object({
  klinik_email: Joi.string().required().max(30),
  password: Joi.string().required().min(6),
});

export { createKlinikValidation, loginKlinikValidation };
