const roomModel = require("../models/RoomModel");

/* Controlador para crear una habitación */
const createRoom = async function (req, res) {
  try {
    // Datos enviados por el usuario

    const {
      room_number,
      rate,
      id_room_type,
      id_room_status,
      id_floor,
      photo_path,
    } = req.body;

    // Validar que se hayan ingresado todos los datos

    if (
      !room_number ||
      !rate ||
      !id_room_type ||
      !id_room_status ||
      !id_floor ||
      !photo_path
    ) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos." });
    }

    // Verificar que la habitación no exista a través del room_number

    const room = await roomModel.findRoom(room_number);
    if (room) {
      return res.status(409).json({ message: "La habitación ya existe." });
    }

    // Crear la habitación
    await roomModel.createRoom(
      room_number,
      rate,
      id_room_type,
      id_room_status,
      id_floor,
      photo_path
    );

    res.json({ message: "Habitación creada con éxito." });
  } catch (error) {
    console.error("Error al crear la habitación: ", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

module.exports = { createRoom };
