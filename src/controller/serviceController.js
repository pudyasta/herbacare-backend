import serviceService from "../service/serviceService.js";

const createService = async (req, res, next) => {
  try {
    const result = await serviceService.createService(req, res);
    res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getAllServicePerKlinik = async (req, res, next) => {
  try {
    const result = await serviceService.getAllServicePerKlinik(req, res);
    res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default { createService, getAllServicePerKlinik };
