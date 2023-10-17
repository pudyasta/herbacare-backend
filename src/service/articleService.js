import { prismaClient } from "../app/db.js";
import { ResponseError } from "../error/response-error.js";
import { stripHtml } from "../helper/helper.js";
import {
  createArticleValidation,
  editArticleValidation,
} from "../validation/articleValidation.js";
import sanitizeHtml from "sanitize-html";
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
  let articles = await prismaClient.articles.findMany({
    take: 50,
    select: {
      articles_id: true,
      title: true,
      image: true,
      category: true,
      body: true,
    },
  });

  articles = articles.map((e, i) => {
    return {
      ...articles[i],
      body: sanitizeHtml(articles[i].body, {
        allowedTags: [],
        allowedAttributes: [],
      })
        .trim()
        .split(/\s+/)
        .slice(0, 20)
        .join(" "),
    };
  });

  return articles;
};

const getArticleByIdService = async (req) => {
  const article = await prismaClient.articles.findUnique({
    where: { articles_id: parseInt(req.params.id) },
    include: {
      category: true,
    },
  });
  return article;
};

const editArticleService = async (req) => {
  const updatedArticle = validate(editArticleValidation, req.body);
  const articleId = parseInt(req.params.id);

  if (req.file) {
    return prismaClient.articles.update({
      where: {
        articles_id: articleId,
      },
      data: {
        title: updatedArticle.title,
        body: updatedArticle.body,
        image: req.file.path,
      },
      select: {
        title: true,
      },
    });
  } else {
    return prismaClient.articles.update({
      where: {
        articles_id: articleId,
      },
      data: {
        title: updatedArticle.title,
        body: updatedArticle.body,
      },
      select: {
        title: true,
      },
    });
  }
};

const deleteArticleService = async (req) => {
  const articleId = parseInt(req.params.id); // Convert to an integer

  // Delete the category using Prisma
  const deletedCategory = await prismaClient.articles.delete({
    where: {
      articles_id: articleId,
    },
    select: {
      title: true,
    },
  });

  return deletedCategory;
};

const searchArticleService = async (req) => {
  const searchTerm = req.params.value;

  let articles = await prismaClient.articles.findMany({
    where: {
      title: {
        contains: searchTerm,
      },
    },
    select: {
      articles_id: true,
      title: true,
      image: true,
      category: true,
      body: true,
    },
  });
  articles = articles.map((e, i) => {
    return {
      ...articles[i],
      body: sanitizeHtml(articles[i].body, {
        allowedTags: [],
        allowedAttributes: [],
      })
        .trim()
        .split(/\s+/)
        .slice(0, 20)
        .join(" "),
    };
  });

  return articles;
};

const getArticleByCategoryService = async (req) => {
  const searchTerm = parseInt(req.params.value);

  let articles = await prismaClient.articles.findMany({
    where: {
      category_id: {
        equals: searchTerm,
      },
    },
    select: {
      articles_id: true,
      title: true,
      image: true,
      category: true,
      body: true,
    },
  });
  articles = articles.map((e, i) => {
    return {
      ...articles[i],
      body: sanitizeHtml(articles[i].body, {
        allowedTags: [],
        allowedAttributes: [],
      })
        .trim()
        .split(/\s+/)
        .slice(0, 20)
        .join(" "),
    };
  });

  return articles;
};

export default {
  createArticleService,
  getAllArticleService,
  getArticleByIdService,
  editArticleService,
  deleteArticleService,
  getArticleByCategoryService,
  searchArticleService,
};
