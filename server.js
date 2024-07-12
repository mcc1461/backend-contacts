const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const dbConnection = require('./config/dbConnection');

dbConnection();

const app = express();
const port = process.env.PORT || 3007;

app.use(cors());
app.use(express.json());

const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes')

app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);





app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}   
);



