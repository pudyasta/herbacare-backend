import { prismaClient } from "../app/db.js";
import { ResponseError } from "../error/response-error.js";
import {
  loginValidation,
  registerUservalidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const registerService = async (req) => {
  const user = validate(registerUservalidation, req);

  const countUser = await prismaClient.user.count({
    where: {
      nik: user.nik,
    },
  });

  if (countUser == 1) new ResponseError(400, "User telah terdaftar");

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      nik: true,
      name: true,
      email: true,
      alamat: true,
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
      nik: true,
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

  const token = uuid().toString();
  return prismaClient.user.update({
    data: {
      token,
    },
    where: {
      email: logReq.email,
    },
    select: {
      token: true,
      name: true,
      email: true,
      alamat: true,
    },
  });
};

export default { registerService, login };
