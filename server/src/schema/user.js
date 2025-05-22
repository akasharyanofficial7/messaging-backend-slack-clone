import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username already exists"],
      minLength: [3, "Username must be at least 3 character"],
      match: [
        /^[a-zA-Z0-9]+$/,
        "Username must contain only letters and numbers",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters"],
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

// Hash password and set avatar before saving
userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const SALT = bcrypt.genSaltSync(9);
  user.password = bcrypt.hashSync(user.password, SALT);
  user.avatar = `https://robohash.org/${user.username}`;
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
