const Card = require("../models/card-model");

// Fetch all cards
const cards = async (req, res) => {
  try {
    const response = await Card.find();
    if (!response) {
      res.status(404).json({ msg: "No cards found" });
      return;
    }
    return res.status(200).json({ msg: "Cards found", data: response });
  } catch (error) {
    console.error(`Error from the server: ${error}`);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Fetch a single card by name
const cardByName = async (req, res) => {
  try {
    const { name } = req.params; // Extract the name from the URL
    // Normalize the name for query
    const normalizedName = name.replace(/-/g, " ");
    const response = await Card.findOne({
      Name: { $regex: `^${normalizedName}$`, $options: "i" },
    }); // Case-insensitive match
    if (!response) {
      res.status(404).json({ msg: `Card with name '${name}' not found` });
      return;
    }
    return res.status(200).json({ msg: "Card found", data: response });
  } catch (error) {
    console.error(`Error from the server: ${error}`);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { cards, cardByName };
