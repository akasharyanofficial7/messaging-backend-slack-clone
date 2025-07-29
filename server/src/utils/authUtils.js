import jwt from "jsonwebtoken";
import { JWT_EXP, JWT_SECRET } from "../config/serverConfig.js";

export const createToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXP,
  });
};
