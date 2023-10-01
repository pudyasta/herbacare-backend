import express from "express";
import userController from "../controller/userController.js";

const publicRouter = new express();

publicRouter.post("/api/userreg", userController.register);
publicRouter.post("/api/login", userController.login);

export { publicRouter };
