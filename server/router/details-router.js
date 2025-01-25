const express = require('express');
const Card = require('../models/card-model'); // Your Card model

const router = express.Router();

router.get("/name/:name", async (req, res) => {
  console.log("Received request with Name:", req.params.name);

  const { name } = req.params;

  try {
    const product = await Card.findOne({ Name: name }); // Assuming 'Name' is a unique field
    if (!product) {
      console.log("Product not found for Name:", name);
      return res.status(404).json({ error: "Product not found" });
    }
    console.log("Product found:", product);
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
