const express = require("express");
const router = express.Router();
const offerController = require("../controllers/OfferController");

router.get("/", offerController.readAllOffers);

router.post("/new", offerController.createOffer);

module.exports = router;
