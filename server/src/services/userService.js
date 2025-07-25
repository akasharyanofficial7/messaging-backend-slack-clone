import userRepository from "../repositories/userRepository.js";
import ValidationError from "../utils/errors/validationError.js";

export const signUpService = async (data) => {
  try {
    const newUser = await userRepository.create(data);
    return newUser;
  } catch (error) {
    console.log("User service error", error);
    if (error.name === "ValidationError") {
      throw new ValidationError(
        {
          error: error.errors,
        },
        error.message
      );
    }
    if (error.name === "MongoServerError" && error.code === 11000) {
      throw new ValidationError(
        {
          error: ["A user with same email or username already exists"],
        },
        "A user with same email or username already exists"
      );
    }
  }
};
