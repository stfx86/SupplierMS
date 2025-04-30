const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const supplierRoutes = require("./routes/supplierRoutes");
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use("/api/suppliers", supplierRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});


module.exports = app; 