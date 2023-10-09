import Joi from "joi";

const createCategoryValidation = Joi.object({
  category_name: Joi.string().required().max(30),
});

export { createCategoryValidation };
