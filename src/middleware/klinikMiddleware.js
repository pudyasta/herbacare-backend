import jwt from "jsonwebtoken";

export const klinikMiddleware = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization.split(" ")[1];
    if (authToken !== undefined) {
      const authData = jwt.verify(authToken, process.env.JWT_SECRET);

      if (authData.data.role == "klinik") {
        res.data = authData;
        next();
      } else {
        return res.status(403).json({
          error: "Forbidden, you dont have access with this type of user",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};
