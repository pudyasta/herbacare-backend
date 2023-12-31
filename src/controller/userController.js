import userService from "../service/userService.js";

const register = async (req, res, next) => {
  try {
    const result = await userService.registerService(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};
const registerAdmin = async (req, res, next) => {
  try {
    const result = await userService.registrasiAdmin(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};
const loginAdmin = async (req, res, next) => {
  try {
    const result = await userService.loginAdmin(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default { register, login, loginAdmin, registerAdmin };
