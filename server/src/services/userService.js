import userRepository from "../repositories/userRepository.js";
import { createToken } from "../utils/authUtils.js";
import ClientError from "../utils/clientError.js";
import ValidationError from "../utils/errors/validationError.js";
import bcrypt from "bcrypt";

export const signUpService = async (data) => {
  try {
    const newUser = await userRepository.create(data);
    return newUser;
  } catch (error) {
    console.log("User service error", error);
    if (error?.cause?.code === 11000) {
      throw new ValidationError(
        {
          error: ["A user with same email or username already exists"],
        },
        "A user with same email or username already exists"
      );
    }
    if (error.name === "ValidationError") {
      throw new ValidationError(
        {
          error: Object.values(error.errors).map((e) => e.message),
        },
        error.message
      );
    }
    throw error;
  }
};

export const signInService = async (data) => {
  try {
    const user = await userRepository.getByEmail(data.email);

    if (!user) {
      throw new ClientError({
        message: "Invalid email or password",
        explanation: "The email or password you entered is incorrect.",
        statusCode: 401,
      });
    }

    const isMatch = await bcrypt.compareSync(data.password, user.password);
    if (!isMatch) {
      throw new ClientError({
        message: "Invalid email or password",
        explanation: "The email or password you entered is incorrect.",
        statusCode: 401,
      });
    }

    return {
      username: user.username,
      token: createToken({ id: user._id, email: user.email }),
      email: user.email,
      avatar: user.avatar,
    };
  } catch (error) {
    console.log("User service error", error);
    throw error;
  }
};
