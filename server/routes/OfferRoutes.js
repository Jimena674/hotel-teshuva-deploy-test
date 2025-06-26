const express = require("express");
const router = express.Router();
const offerController = require("../controllers/OfferController");

router.get("/", offerController.readAllOffers);
router.get("/:id_offer", offerController.readOffer);

router.post("/new", offerController.createOffer);

module.exports = router;
