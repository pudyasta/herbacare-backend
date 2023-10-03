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

export default { createReservasi };
