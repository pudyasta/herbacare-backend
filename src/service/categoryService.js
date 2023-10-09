import { prismaClient } from "../app/db.js";
import { createCategoryValidation } from "../validation/categoryValidation.js";
import { validate } from "../validation/validation.js";

const createCategoryService = async (req) => {
  const newCategory = validate(createCategoryValidation, req.body);
  return prismaClient.categories.create({
    data: {
      category_name: newCategory.category_name, // Use category_name instead of title
    },
    select: {
      category_name: true,
    },
  });
};

const getAllCategoryService = async (req) => {
  const articles = await prismaClient.categories.findMany({ take: 50 });
  return articles;
};

const editCategoryService = async (req) => {
  const updatedCategory = validate(createCategoryValidation, req.body);
  const categoryId = parseInt(req.params.id);

  return prismaClient.categories.update({
    where: {
      category_id: categoryId, // Assuming 'id' is the primary key field for categories
    },
    data: {
      category_name: updatedCategory.category_name,
    },
    select: {
      category_name: true,
    },
  });
};

const deleteCategoryService = async (req) => {
  const categoryId = parseInt(req.params.id); // Convert to an integer

  // Delete the category using Prisma
  const deletedCategory = await prismaClient.categories.delete({
    where: {
      category_id: categoryId, // Assuming 'category_id' is the primary key field for categories
    },
    select: {
      category_name: true,
    },
  });

  return deletedCategory;
};

export default {
  createCategoryService,
  getAllCategoryService,
  editCategoryService,
  deleteCategoryService,
};
