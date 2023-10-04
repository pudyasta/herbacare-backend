import express from "express";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import articleController from "../controller/articleController.js";
import multer from "multer";
import reservasiController from "../controller/reservasiController.js";
import klinikController from "../controller/klinikController.js";
import { userMiddleware } from "../middleware/loginMiddleware.js";
import serviceController from "../controller/serviceController.js";
import { klinikMiddleware } from "../middleware/klinikMiddleware.js";

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

userRouter.post(
  "/api/klinik/post",
  userMiddleware,
  klinikController.createKlinik
);
userRouter.get(
  "/api/klinik/all",
  userMiddleware,
  klinikController.getAllKlinik
);
userRouter.get(
  "/api/klinik/:id",
  userMiddleware,
  klinikController.getKlinikDetail
);

userRouter.post(
  "/api/service/post",
  klinikMiddleware,
  serviceController.createService
);

export { userRouter };
