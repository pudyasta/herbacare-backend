import jwt from "jsonwebtoken";

export const userMiddleware = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization.split(" ")[1];
    if (authToken !== undefined) {
      const authData = jwt.verify(authToken, process.env.JWT_SECRET);
      if (authData.data.role == "user") {
        res.data = authData;
        next();
      } else {
        return res.status(403).json({
          error: "Forbidden, you dont have access with this type of user",
        });
      }
    } else {
      throw new ResponseError(403, "Forbidden Acces");
    }
  } catch (error) {
    return res.status(500).json({ error: "Forbidden Acces" });
  }
};
