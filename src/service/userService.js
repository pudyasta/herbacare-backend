import { prismaClient } from "../app/db.js";
import { ResponseError } from "../error/response-error.js";
import {
  loginValidation,
  registerUservalidation,
} from "../validation/userValidation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerService = async (req) => {
  const user = validate(registerUservalidation, req);

  const countUser = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });

  if (countUser == 1) new ResponseError(400, "Email telah terdaftar");

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      name: true,
      email: true,
      address: true,
    },
  });
};

const login = async (req) => {
  const logReq = validate(loginValidation, req);

  const user = await prismaClient.user.findUnique({
    where: {
      email: logReq.email,
    },
    select: {
      name: true,
      address: true,
      email: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Username or password wrong");
  }
  const isPasswordValid = await bcrypt.compare(logReq.password, user.password);

  if (!isPasswordValid) {
    throw new ResponseError(401, "Username or password wrong");
  }
  const jwToken = jwt.sign(
    {
      data: {
        email: user.email,
        name: user.name,
        address: user.address,
        role: "admin",
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
  return {
    status: "success",
    data: {
      email: user.email,
      name: user.name,
      address: user.address,
      jwToken,
    },
  };
};

export default { registerService, login };
