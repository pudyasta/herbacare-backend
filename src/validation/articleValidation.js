import Joi from "joi";

const createArticleValidation = Joi.object({
  title: Joi.string().required().max(30),
  body: Joi.string().required().max(1000),
  category_id: Joi.required(),
});

const editArticleValidation = Joi.object({
  title: Joi.string(),
  body: Joi.string(),
  category_id: Joi.number(),
});
export { createArticleValidation, editArticleValidation };
