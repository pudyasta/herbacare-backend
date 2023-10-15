import express from "express";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import articleController from "../controller/articleController.js";
import multer from "multer";
import reservasiController from "../controller/reservasiController.js";
import klinikController from "../controller/klinikController.js";
import { userMiddleware } from "../middleware/loginMiddleware.js";
import serviceController from "../controller/serviceController.js";
import { klinikMiddleware } from "../middleware/klinikMiddleware.js";
import categoryController from "../controller/categoryController.js";

const userRouter = new express.Router();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

userRouter.use(multer({ storage: fileStorage, fileFilter }).single("image"));

userRouter.post(
  "/api/article/post",
  adminMiddleware,
  articleController.createArticle
);
userRouter.post(
  "/api/reservasi/post",
  userMiddleware,
  reservasiController.createReservasi
);

userRouter.get("/api/article/all", articleController.getAllArticle);
userRouter.get("/api/article/:id", articleController.getArticleById);
userRouter.get("/api/article/search/:value", articleController.searchArticle);

userRouter.put(
  "/api/article/edit/:id",
  // adminMiddleware,
  articleController.editArticle
);
userRouter.delete(
  "/api/article/delete/:id",
  adminMiddleware,
  articleController.deleteArticle
);

userRouter.post(
  "/api/klinik/post",
  // adminMiddleware,
  klinikController.createKlinik
);
userRouter.get("/api/klinik/all", klinikController.getAllKlinik);
userRouter.get("/api/klinik/:id", klinikController.getKlinikDetail);
userRouter.get("/api/klinik/search/:value", klinikController.searchKlinik);

userRouter.get(
  "/api/service/klinik/:id",
  serviceController.getAllServicePerKlinik
);

userRouter.delete(
  "/api/klinik/:id",
  adminMiddleware,
  klinikController.deleteKlinik
);

userRouter.post(
  "/api/service/post",
  klinikMiddleware,
  serviceController.createService
);

userRouter.post(
  "/api/categories/post",
  adminMiddleware,
  categoryController.createCategory
);

userRouter.put(
  "/api/categories/:id",
  adminMiddleware,
  categoryController.editCategory
);

userRouter.get("/api/category/all", categoryController.getAllCategory);

userRouter.delete(
  "/api/categories/:id",
  adminMiddleware,
  categoryController.deleteCategory
);

userRouter.get(
  "/api/reservasi/:id",
  // klinikMiddleware,
  reservasiController.getReservasi
);

export { userRouter };
