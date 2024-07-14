const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const { exec } = require("child_process");

const dbConnection = require("./config/dbConnection");

dbConnection();

const PORT = process.env.PORT || 3007;

app.use(cors());
app.use(express.json());

const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

// Function to run the createAdminUser.js script
const createAdminUser = () => {
  exec("node createAdminUser.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`Script stderr: ${stderr}`);
      return;
    }
    console.log(`Script stdout: ${stdout}`);
  });
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  if (process.env.RUN_CREATE_ADMIN_USER === "true") {
    createAdminUser();
  }
});

module.exports = { app };