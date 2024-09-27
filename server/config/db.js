const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const connectDB = () => {
  db.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err.stack);
      return;
    }
    console.log("Connected to database.");
  });
};

// Export the connectDB function and the db object
module.exports = {
  connectDB,
  db,
};
