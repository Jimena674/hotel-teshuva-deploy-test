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
      "SELECT room .*, room_type.name AS room_type, room_status.name AS room_status, floor.name AS floor FROM room JOIN room_type ON room.id_room_type = room_type.id_room_type JOIN room_status ON room.id_room_status = room_status.id_room_status JOIN floor ON room.id_floor = floor.id_floor WHERE room.room_number = ?",
      [room_number]
    );
  return rows[0];
};

/* Modelo para eliminar una habitación por el room_number */

const deleteRoom = async (room_number) => {
  const [result] = await db
    .promise()
    .query(`DELETE FROM room WHERE room_number = ?`, [room_number]);
  return result;
};

/* Modelo para actualizar una habitación por el id */

const updateRoom = async (id_room, updatedData) => {
  const fields = [];
  const values = [];

  for (let key in updatedData) {
    fields.push(`${key} = ?`);
    values.push(updatedData[key]);
  }

  const sql = `UPDATE room SET ${fields.join(", ")} WHERE id_room = ?`;
  values.push(id_room);

  const [result] = await db.promise().query(sql, values);
  return result;
};

/* Modelo para obtener todos los datos de las habitaciones */

const getAllRooms = async () => {
  const [rows] = await db
    .promise()
    .query(
      `SELECT room.id_room, room.room_number, room.rate, room.photo_path, room_type.name AS room_type, room_status.name AS room_status, floor.name AS floor FROM room JOIN room_type ON room.id_room_type = room_type.id_room_type JOIN room_status ON room.id_room_status = room_status.id_room_status JOIN floor ON room.id_floor = floor.id_floor`
    );
  return rows;
};

module.exports = { createRoom, findRoom, deleteRoom, updateRoom, getAllRooms };
