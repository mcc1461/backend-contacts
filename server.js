const express = require('express');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3007;
const contactRoutes = require('./routes/contactRoutes');

app.use(express.json());

app.use("/api/contacts", contactRoutes);





app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}   
);



