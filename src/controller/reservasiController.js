import reservasiService from "../service/reservasiService.js";

const createReservasi = async (req, res, next) => {
  try {
    await reservasiService.createReservasiService(req, res);
    return res.status(200).json({
      status: "success",
      message: "Berhasil melakukan reservasi",
    });
  } catch (e) {
    next(e);
  }
};

const getReservasi = async (req, res, next) => {
  try {
    const result = await reservasiService.getReservasiService(req);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getReservasiByUser = async (req, res, next) => {
  try {
    const result = await reservasiService.getReservasiByUserService(req, res);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};
const getReservasiByKlinik = async (req, res, next) => {
  try {
    const result = await reservasiService.getReservasiByKlinikService(req, res);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  createReservasi,
  getReservasi,
  getReservasiByUser,
  getReservasiByKlinik,
};
