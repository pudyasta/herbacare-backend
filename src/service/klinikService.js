import { prismaClient } from "../app/db.js";
import { ResponseError } from "../error/response-error.js";
import { formatTimeTo } from "../helper/helper.js";
import {
  createKlinikValidation,
  loginKlinikValidation,
} from "../validation/klinikValidation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createKlinikService = async (req) => {
  const user = validate(createKlinikValidation, req.body);
  console.log(req.file);
  const countUser = await prismaClient.kliniks.count({
    where: {
      klinik_email: user.klinik_email,
    },
  });

  if (countUser == 1) new ResponseError(400, "Email telah terdaftar");
  if (req.file == undefined) {
    throw new ResponseError(400, "Image harus diupload");
  }
  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.kliniks.create({
    data: {
      klinik_name: user.klinik_name,
      klinik_address: user.klinik_address,
      klinik_phone: user.klinik_phone,
      klinik_email: user.klinik_email,
      password: user.password,
      klinik_description: user.klinik_description,
      klinik_open: formatTimeTo(user.klinik_open),
      klinik_close: formatTimeTo(user.klinik_close),
      klinik_image: req.file.path,
    },
  });
};

const loginKlinik = async (req) => {
  const logReq = validate(loginKlinikValidation, req);
  const user = await prismaClient.kliniks.findUnique({
    where: {
      klinik_email: logReq.klinik_email,
    },
  });

  if (!user) {
    throw new ResponseError(401, "User tidak terdaftar");
  }
  const isPasswordValid = await bcrypt.compare(logReq.password, user.password);

  if (!isPasswordValid) {
    throw new ResponseError(401, "Password salah");
  }
  const jwToken = jwt.sign(
    {
      data: {
        klinik_id: user.klinik_id,
        klinik_name: user.klinik_name,
        klinik_address: user.klinik_address,
        klinik_phone: user.klinik_phone,
        klinik_email: user.klinik_email,
        klinik_description: user.klinik_description,
        klinik_image: user.klinik_image,
        klinik_open: user.klinik_open,
        klinik_close: user.klinik_close,
        role: "klinik",
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
  return {
    status: "success",
    data: {
      klinik_id: user.klinik_id,
      klinik_name: user.klinik_name,
      klinik_address: user.klinik_address,
      klinik_phone: user.klinik_phone,
      klinik_email: user.klinik_email,
      klinik_description: user.klinik_description,
      klinik_image: user.klinik_image,
      klinik_open: user.klinik_open,
      klinik_close: user.klinik_close,
      jwToken,
    },
  };
};

const getAllKlinik = async (req) => {
  const articles = await prismaClient.kliniks.findMany({
    take: 50,
    select: {
      klinik_id: true,
      klinik_name: true,
      klinik_open: true,
      klinik_address: true,
      klinik_close: true,
    },
  });
  return articles;
};

const getKlinikDetailService = async (req) => {
  const klinik = await prismaClient.kliniks.findUnique({
    where: {
      klinik_id: parseInt(req.params.id),
    },
    select: {
      klinik_id: true,
      klinik_name: true,
      klinik_address: true,
      klinik_phone: true,
      klinik_email: true,
      klinik_description: true,
      klinik_image: true,
      klinik_open: true,
      klinik_close: true,
    },
  });
  const service = await prismaClient.services.findMany({
    where: {
      klinik_id: parseInt(req.params.id),
    },
    select: {
      service_id: true,
      service_name: true,
      capacity: true,
      klinik_id: true,
    },
  });
  return {
    data: klinik,
    service: service,
  };
};

export default {
  createKlinikService,
  loginKlinik,
  getAllKlinik,
  getKlinikDetailService,
};
