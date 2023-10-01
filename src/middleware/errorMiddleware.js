import { ResponseError } from "../error/response-error.js";

const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }
  const pass = err.message.replace(/\n|"|`|\\/g, "");

  console.log(pass);
  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        errors: {
          status: err.status,
          message: pass,
        },
      })
      .end();
  } else {
    res
      .status(500)
      .json({
        errors: {
          status: err.status,
          message: pass,
        },
      })
      .end();
  }
};

export { errorMiddleware };
