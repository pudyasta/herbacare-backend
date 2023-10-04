import Joi from "joi";

const createServiceValidation = Joi.object({
  service_name: Joi.string().required().max(30),
  capacity: Joi.number().required(),
});

export { createServiceValidation };
