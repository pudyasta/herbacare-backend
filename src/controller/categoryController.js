import categoryService from "../service/categoryService.js";

const createCategory = async (req, res, next) => {
  try {
    const result = await categoryService.createCategoryService(req);
    res.status(200).json({
      data: {
        status: "success",
        message: "category berhasil dibuat",
      },
    });
  } catch (e) {
    next(e);
  }
};

const editCategory = async (req, res, next) => {
  try {
    const result = await categoryService.editCategoryService(req);
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

const deleteCategory = async (req, res, next) => {
  try {
    const result = await categoryService.deleteCategoryService(req);
    res.status(200).json({
      data: {
        status: "success",
        message: "category berhasil dihapus",
      },
    });
  } catch (e) {
    next(e);
  }
};

const getAllCategory = async (req, res, next) => {
  try {
    const result = await categoryService.getAllCategoryService(req);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default { createCategory, editCategory, deleteCategory, getAllCategory };
