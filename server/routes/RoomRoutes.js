const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerConfig");

const roomController = require("../controllers/RoomController");

// Rutas para la gestión de habitaciones
router.post("/new", roomController.createRoom);
router.delete("/:room_number", roomController.deleteRoom);
router.put("/:id_room", upload.single("newPhoto"), roomController.updateRoom);
router.get("/", roomController.getAllRooms);
router.get("/:id_room", roomController.readRoom);
router.get("/facilities", roomController.getAllFacilities);

module.exports = router;
