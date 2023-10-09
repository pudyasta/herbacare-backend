import logger from "./src/app/logging.js";
import cors from "cors";
import { web } from "./src/app/web.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import express from "express";

web.use(cors());

web.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
web.use("/assets", express.static(path.join(__dirname, "assets")));

web.listen(process.env.PORT || 3000, () => {
  logger.info("app strat");
});
