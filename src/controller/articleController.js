import articleService from "../service/articleService.js";

const createArticle = async (req, res, next) => {
  try {
    const result = await articleService.createArticleService(req);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getAllArticle = async (req, res, next) => {
  try {
    const result = await articleService.getAllArticleService(req);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getArticleById = async (req, res, next) => {
  try {
    const result = await articleService.getArticleByIdService(req);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const editArticle = async (req, res, next) => {
  try {
    const result = await articleService.editArticleService(req);
    res.status(200).json({
      data: {
        status: "success",
        message: "article berhasil diedit",
      },
    });
  } catch (e) {
    next(e);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const result = await articleService.deleteArticleService(req);
    res.status(200).json({
      data: {
        status: "success",
        message: "article berhasil dihapus",
      },
    });
  } catch (e) {
    next(e);
  }
};

export default {
  createArticle,
  getArticleById,
  getAllArticle,
  editArticle,
  deleteArticle,
};
