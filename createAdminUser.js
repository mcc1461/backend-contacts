const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/userModel");
const dotenv = require("dotenv");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const createAdminUser = async () => {
  const username = "admin";
  const email = "admin@example.com";
  const password = "admin123";

  const userExists = await User.findOne({ email });

  if (userExists) {
    console.log("Admin user already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const adminUser = new User({
    username,
    email,
    password: hashedPassword,
    isAdmin: true,
  });

  await adminUser.save();
  console.log("Admin user created");
  process.exit();
};

createAdminUser();
