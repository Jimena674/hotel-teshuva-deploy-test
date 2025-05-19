const express = require("express");
const router = express.Router();

const roomController = require("../controllers/RoomController");

// Rutas para la gestión de habitaciones
router.post("/create", roomController.createRoom);
router.delete("/:room_number", roomController.deleteRoom);

module.exports = router;
