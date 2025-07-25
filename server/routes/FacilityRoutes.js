const express = require("express");
const router = express.Router();
const facilityController = require("../controllers/FacilityControler");

router.get("/", facilityController.getAllFacilities);

module.exports = router;
