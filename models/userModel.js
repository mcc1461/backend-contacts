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
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Please provide user password"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to increase createdAt and updatedAt by 3 hours
userSchema.pre("save", function (next) {
  const date = new Date();
  const adjustedDate = new Date(date.getTime() + 3 * 60 * 60 * 1000);

  if (this.isNew) {
    // Only adjust the createdAt for new documents
    this.createdAt = adjustedDate;
  }
  this.updatedAt = adjustedDate;
  next();
});

// Pre-update hook to increase updatedAt by 3 hours
userSchema.pre("findOneAndUpdate", function (next) {
  const date = new Date();
  const adjustedDate = new Date(date.getTime() + 3 * 60 * 60 * 1000);
  this.set({ updatedAt: adjustedDate });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
