import { StatusCodes } from "http-status-codes";

import { signInService, signUpService } from "../services/userService.js";
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse,
} from "../utils/common/responseObjects.js";

export const signUp = async (req, res) => {
  try {
    const user = await signUpService(req.body);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json(
        customErrorResponse({
          statusCode: StatusCodes.UNAUTHORIZED,
          message: "Invalid credentials",
          explanation: "Email or password is incorrect",
        })
      );
    }

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(user, "User created successfully"));
  } catch (error) {
    console.log("User controller error", error);

    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const signIn = async (req, res) => {
  try {
    const user = await signInService(req.body);

    return res
      .status(StatusCodes.OK)
      .json(successResponse(user, "User signed in successfully"));
  } catch (error) {
    console.log("User controller error", error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
