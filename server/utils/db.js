const mongoose = require("mongoose");
const Card = require("../models/card-model"); // Correctly import the backend Card model

// const URI = "mongodb://127.0.0.1:27017/mern_admin_panel";
const URI = process.env.MONGODB_URI;
// console.log(URI);

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection successful to DB");
  } catch (error) {
    console.error("Database connection failed");
    process.exit(0);
  }

  // Fetching the product card from the database using the Card model
  try {
    const testCard = await Card.findById("6756da85eb78edb493830b44");
    console.log(
      "Test Card:",
      testCard ? testCard : "Card not found in the database."
    );
    // Log the product card details
  } catch (err) {
    console.error("Error fetching the product card:", err);
  }
};

module.exports = connectDb;
