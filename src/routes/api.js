import express from "express";
import { authMiddleware } from "../middleware/adminMiddleware.js";
import articleController from "../controller/articleController.js";
import multer from "multer";

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
  authMiddleware,
  articleController.createArticle
);
userRouter.get("/api/article/all", articleController.getAllArticle);
userRouter.get("/api/article/:id", articleController.getArticleById);

export { userRouter };
