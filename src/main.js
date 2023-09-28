import logger from "./app/logging.js";
import cors from "cors";
import { web } from "./app/web.js";

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

web.listen(process.env.PORT, () => {
  logger.info("app strat");
});
