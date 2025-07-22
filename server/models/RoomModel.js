// Acceder y estructurar los datos

const db = require("../config/db");

/* Modelo para crear una habitación */

const createRoom = async (
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
  const [rows] = await db.promise().query(
    `SELECT 
      room.id_room, 
      room.room_number, 
      room.rate, 
      room.photo_path, 
      room.room_description,
      room_type.name AS room_type, 
      room_status.name AS room_status, 
      floor.name AS floor,
      facility.name AS facility_name
      FROM room 
      JOIN room_type ON room.id_room_type = room_type.id_room_type 
      JOIN room_status ON room.id_room_status = room_status.id_room_status 
      JOIN floor ON room.id_floor = floor.id_floor
      JOIN room_facility ON room.id_room = room_facility.id_room
      JOIN facility ON room_facility.id_facility = facility.id_facility`
  );

  // Objeto para agrupar la información
  const roomMap = {};
  // Agrupar habitaciones y servicios
  // Se recorre cada fila que viene de la base de datos
  rows.forEach((row) => {
    // Si no existe la habitación o id_room en roomMap
    if (!roomMap[row.id_room]) {
      // Se crea la habitación
      roomMap[row.id_room] = {
        id_room: row.id_room,
        room_number: row.room_number,
        rate: row.rate,
        photo_path: row.photo_path,
        room_description: row.room_description,
        room_type: row.room_type,
        room_status: row.room_status,
        floor: row.floor,
        // Se agrega la propiedad facilities como un array vacío
        facilities: [],
      };
    }

    // Añade cada facility en la propiedad facilities. Evita duplicados
    roomMap[row.id_room].facilities.push(row.facility_name);
  });

  // Convertir en array
  return Object.values(roomMap);
};

/* Modelo para obtener los datos de una habitación */

const readRoom = async (id_room) => {
  const [rows] = await db.promise().query(
    `SELECT room.*, 
      room_type.name AS room_type, 
      room_status.name AS room_status, 
      floor.name AS floor,
      facility.name AS facility_name 
      FROM room 
      JOIN room_type ON room.id_room_type = room_type.id_room_type 
      JOIN room_status ON room.id_room_status = room_status.id_room_status 
      JOIN floor ON room.id_floor = floor.id_floor
      JOIN room_facility ON room.id_room = room_facility.id_room
      JOIN facility ON room_facility.id_facility = facility.id_facility 
      WHERE room.id_room = ?`,
    [id_room]
  );

  const room = {
    id_room: rows[0].id_room,
    room_number: rows[0].room_number,
    rate: rows[0].rate,
    photo_path: rows[0].photo_path,
    room_description: rows[0].room_description,
    room_type: rows[0].room_type,
    room_status: rows[0].room_status,
    floor: rows[0].floor,
    facilities: [],
  };

  rows.forEach((row) => {
    room.facilities.push(row.facility_name);
  });

  return room;
};

module.exports = {
  createRoom,
  findRoom,
  deleteRoom,
  updateRoom,
  getAllRooms,
  readRoom,
};
