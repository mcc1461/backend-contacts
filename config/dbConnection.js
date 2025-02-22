const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const { MONGO_URI } = process.env;

const dbConnection = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URI);
    console.log(
      `MongoDB connected: mongodb.net ${connect.connection.name}`
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = dbConnection;

