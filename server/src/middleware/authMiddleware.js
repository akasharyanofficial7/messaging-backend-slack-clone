import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { JWT_SECRET } from "../config/serverConfig.js";
import {
  customErrorResponse,
  internalErrorResponse,
} from "../utils/common/responseObjects.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log("Token received:", token);

  try {
    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          statusCode: StatusCodes.FORBIDDEN,
          message: " In valid data sent by the client",
          explanation: "No token provided",
        })
      );
    }

    const response = jwt.verify(token, JWT_SECRET);
    console.log("✅ Token decoded response:", response);
    if (!response) {
      return res.status(StatusCodes.UNAUTHORIZED).json(
        customErrorResponse({
          statusCode: StatusCodes.UNAUTHORIZED,
          message: "Unauthorized",
          explanation: "Invalid token",
        })
      );
    }

    const user = userRepository.getById(response.id);
    req.user = user.id;

    next();
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return res.status(StatusCodes.UNAUTHORIZED).json(
        customErrorResponse({
          statusCode: StatusCodes.UNAUTHORIZED,
          message: "Invalid data sent from the client",
          explanation: "Token has expired",
        })
      );
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
