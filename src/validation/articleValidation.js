import Joi from "joi";

const createArticleValidation = Joi.object({
  title: Joi.string().required().max(80),
  body: Joi.string().required(),
  category_id: Joi.required(),
});

const editArticleValidation = Joi.object({
  title: Joi.string(),
  body: Joi.string(),
  category_id: Joi.number(),
});
export { createArticleValidation, editArticleValidation };
