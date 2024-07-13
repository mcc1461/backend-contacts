const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//================ Public functions ================//

//@desc Register a new user
//@route POST /api/users/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, isAdmin } = req.body; // Allow isAdmin to be passed
  console.log("req.body:", req.body);

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    isAdmin: isAdmin || false, // Default to false if not provided
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Create an admin user
//@route POST /api/users/create-admin
//@access Private/Admin

const createAdminUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    isAdmin: true, // This user is an admin
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
})



//@desc Login a user
//@route POST /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }
  const user = await User.findOne({ email });

  //compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
          isAdmin: user.isAdmin, // Include isAdmin in the token
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({
      message: "Login successful",
      token: accessToken,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Get current user
//@route GET /api/users/current
//@access Private

const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, getCurrentUser, createAdminUser };
