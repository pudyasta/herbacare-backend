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
  const articles = await prismaClient.articles.findMany({
    take: 50,
    select: { title: true, image: true, category: true },
  });
  return articles;
};

const getArticleByIdService = async (req) => {
  console.log(req.params.id);
  const article = await prismaClient.articles.findUnique({
    where: { articles_id: parseInt(req.params.id) },
    include: {
      category: true, // Assuming the relationship is named 'category'
    },
  });
  return article;
};

const editArticleService = async (req) => {
  const updatedArticle = validate(createArticleValidation, req.body);
  const articleId = parseInt(req.params.id);

  return prismaClient.articles.update({
    where: {
      articles_id: articleId, // Assuming 'id' is the primary key field for categories
    },
    data: {
      title: updatedArticle.title,
      body: updatedArticle.body,
      image: updatedArticle.image,
    },
    select: {
      title: true,
    },
  });
};

const deleteArticleService = async (req) => {
  const articleId = parseInt(req.params.id); // Convert to an integer

  // Delete the category using Prisma
  const deletedCategory = await prismaClient.articles.delete({
    where: {
      articles_id: articleId, // Assuming 'category_id' is the primary key field for categories
    },
    select: {
      title: true,
    },
  });

  return deletedCategory;
};

export default {
  createArticleService,
  getAllArticleService,
  getArticleByIdService,
  editArticleService,
  deleteArticleService,
};
