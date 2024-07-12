const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide username"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Email already exists"]
    },
    password: {
      type: String,
      required: [true, "Please provide user password"], 
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
