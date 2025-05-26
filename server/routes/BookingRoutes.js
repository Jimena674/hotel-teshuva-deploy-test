const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/BookingController");

router.post("/new", bookingController.createBooking);
router.get("/", bookingController.readAllBookings);
router.get("/:code", bookingController.readBooking);
router.delete("/:id_booking", bookingController.deleteBooking);
router.put("/:id_booking", bookingController.updateBooking);

module.exports = router;
