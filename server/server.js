const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB } = require("./config/db"); // Destructure to import the connectDB function
const webhookRoutes = require("./routes/webhook");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Use webhook routes for handling incoming order data
app.use("/webhook", webhookRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
