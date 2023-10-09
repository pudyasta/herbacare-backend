import express from "express";
import userController from "../controller/userController.js";
import klinikController from "../controller/klinikController.js";

const publicRouter = new express();

publicRouter.post("/api/userreg", userController.register);
publicRouter.post("/api/login", userController.login);
publicRouter.post("/api/klinik/login", klinikController.klinikLogin);
publicRouter.post("/api/admin/reg", userController.registerAdmin);
publicRouter.post("/api/admin/login", userController.loginAdmin);

export { publicRouter };
