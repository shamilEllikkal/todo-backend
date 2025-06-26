import asyncHandler from "express-async-handler";
import user from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  //email already taken
  const userAvailable = await user.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("email already taken");
  }
  //hashed password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed pass :", hashedPassword);

  //create user
  const User = await user.create({
    username,
    email,
    password: hashedPassword,
  });
  res.status(201).json({ msg: User });
});

//login user
export const loginUser = asyncHandler(async (req, res) => {
  const { username , email, password } = req.body;
  if (!email || !password ) {
    res.status(400);
    throw new Error("all field are mandatory");
  }
  const User = await user.findOne({ email });
  if (User && (await bcrypt.compare(password, User.password))) {
    const accessToken = jwt.sign(
      {
        User: {
          username: User.username,
          email: User.email,
          id: User.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
     return res.status(200).json({
      accessToken,
      User: {
        username: User.username,
        email: User.email,
        id: User.id,
      },
    });
  } else {
    res.status(401);
    throw new Error("email or password not valid");
  }
});

export const currentUser = asyncHandler((req, res) => {
    res.json(req.User)
  res.status(200).json({
    msg: "current user info ",
  });
});

export default {
  registerUser,
  loginUser,
  currentUser,
};
