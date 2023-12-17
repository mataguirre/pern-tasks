import jwt from "jsonwebtoken";
import { secret } from "../libs/jwt.js";

export const isAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "No estás autorizado",
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err)
      return res.status(401).json({
        message: "No estás autorizado",
      });

    req.currentUserId = decoded.id;
    next();
  });

  next();
};
