const db = require("../config/db");

/* Modelo para crear una habitación */

const createRoom = async (
  // Promesa createRoom
  room_number,
  rate,
  id_room_type,
  id_room_status,
  id_floor,
  photo_path
) => {
  // Esperar a que la consulta a la base de datos finalice.
  // El flujo se detiene hasta tener el resultado.
  // No se bloquean otras peticiones del servidor.
  await db
    .promise()
    .query(
      "INSERT INTO room (room_number, rate, id_room_type, id_room_status, id_floor, photo_path) VALUES (?, ?, ?, ?, ?, ?)",
      [room_number, rate, id_room_type, id_room_status, id_floor, photo_path]
    );
};

/* Buscar una habitación por el room_number */

const findRoom = async (room_number) => {
  const [rows] = await db
    .promise()
    .query(
      "SELECT room .*, room_type.name AS room_type, room_status.name AS room_status FROM room JOIN room_type ON room.id_room_type = room_type.id_room_type JOIN room_status ON room.id_room_status = room_status.id_room_status WHERE room.room_number = ?",
      [room_number]
    );
  return rows[0];
};

/* Modelo para eliminar una habitación por el room_number */

/* Modelo para actualizar una habitación */

module.exports = { createRoom, findRoom };
