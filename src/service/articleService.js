import { prismaClient } from "../app/db.js";
import { ResponseError } from "../error/response-error.js";
import { createArticleValidation } from "../validation/articleValidation.js";
import { validate } from "../validation/validation.js";

const createArticleService = async (req) => {
  const newArticle = validate(createArticleValidation, req.body);
  if (req.file == undefined) {
    throw new ResponseError(400, "Image harus diupload");
  }
  return prismaClient.articles.create({
    data: {
      title: newArticle.title,
      body: newArticle.body,
      category: {
        connect: {
          category_id: parseInt(newArticle.category_id),
        },
      },
      image: req.file.path,
    },
    select: {
      title: true,
      body: true,
      image: true,
    },
  });
};

const getAllArticleService = async (req) => {
  const articles = await prismaClient.articles.findMany({ take: 50 });
  return articles;
};
const getArticleByIdService = async (req) => {
  console.log(req.params.id);
  const articles = await prismaClient.articles.findUnique({
    where: { articles_id: parseInt(req.params.id) },
  });
  return articles;
};

export default {
  createArticleService,
  getAllArticleService,
  getArticleByIdService,
};
