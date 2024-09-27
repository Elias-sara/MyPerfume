const express = require("express");
const router = express.Router();
const { db } = require("../config/db"); // Adjust the path as needed

// Route to handle incoming order data
router.post("/", (req, res) => {
  const { name, phone, comments, items, total } = req.body;

  // Basic validation
  if (!name || !phone || !items || !total) {
    return res
      .status(400)
      .send({ error: "All required fields must be filled" });
  }

  // Save user data
  const sqlUser = "INSERT INTO users (name, phone) VALUES (?, ?)";
  db.query(sqlUser, [name, phone], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).send({ error: "Database error" });
    }

    const userId = result.insertId;

    // Save order data
    const sqlOrder =
      "INSERT INTO orders (user_id, total_price, comments) VALUES (?, ?, ?)";
    db.query(sqlOrder, [userId, total, comments], (err, result) => {
      if (err) {
        console.error("Error inserting order:", err);
        return res.status(500).send({ error: "Database error" });
      }

      const orderId = result.insertId;

      // Save order items
      const sqlOrderItems =
        "INSERT INTO order_items (order_id, item_name, item_price, quantity) VALUES ?";
      const orderItems = items.map((item) => [
        orderId,
        item.title,
        item.price,
        item.quantity,
      ]);

      db.query(sqlOrderItems, [orderItems], (err) => {
        if (err) {
          console.error("Error inserting order items:", err);
          return res.status(500).send({ error: "Database error" });
        }

        res.send({ message: "Order processed successfully!" });
      });
    });
  });
});

module.exports = router;
