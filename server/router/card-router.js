const express = require("express");
const router = express.Router();
const { cards, cardByName } = require("../controllers/card-controller");

router.route("/card").get(cards);
router.route("/card/:name").get(cardByName); // Add this route

module.exports = router;
