const db = require("../config/db");

/* Modelo para crear una reserva */
const createBooking = async (data) => {
  const { id_user, check_in, check_out, total, code } = data;
  return await db
    .promise()
    .query(
      `INSERT INTO booking ( id_user, check_in, check_out, total, code) VALUES ( ?, ?, ?, ?, ?)`,
      [id_user, check_in, check_out, total, code]
    );
};

/** Modelo para crear el booking_room */
const bookingRoom = async ({ id_booking, id_room }) => {
  await db
    .promise()
    .query(`INSERT INTO booking_room (id_booking, id_room) VALUES (?, ?)`, [
      id_booking,
      id_room,
    ]);
};

/* Modelo para leer todas las reserva */
const readAllBookings = async () => {
  const [rows] = await db.promise().query(
    `SELECT 
      booking.id_booking, 
      booking.id_user, 
      booking.check_in, 
      booking.check_out, 
      booking.total, 
      booking.code, 
      user.name AS user_name, 
      user.id_number AS user_id_number,
      room.room_number AS room_number 
      FROM booking 
      JOIN user ON booking.id_user = user.id
      JOIN booking_room ON booking.id_booking = booking_room.id_booking 
      JOIN room ON booking_room.id_room = room.id_room`
  );
  return rows;
};

/* Modelo para leer una reserva a partir del id_booking*/

const readBooking = async (code) => {
  const [rows] = await db.promise().query(
    `SELECT booking.*, 
      user.name AS user_name, 
      user.id_number AS user_id_number,
      room.room_number AS room_number 
      FROM booking 
      JOIN user ON booking.id_user = user.id
      JOIN booking_room ON booking.id_booking = booking_room.id_booking 
      JOIN room ON booking_room.id_room = room.id_room
      WHERE code = ?`,
    [code]
  );
  return rows[0];
};

/* Modelo para eliminar una reserva por el id_booking */

const deleteBooking = async (id_booking) => {
  const [result] = await db
    .promise()
    .query(`DELETE FROM booking WHERE id_booking = ?`, [id_booking]);
  return result;
};

/* Modelo para modificar una reserva */

const updateBooking = async (code, data) => {
  const fields = [];
  const values = [];

  for (let key in data) {
    fields.push(`${key} = ?`);
    values.push(data[key]);
  }

  const sql = `UPDATE booking SET ${fields.join(", ")} WHERE code = ?`;
  values.push(code);

  const [result] = await db.promise().query(sql, values);
  return result;
};

const updateBookingRoom = async (id_booking, id_room) => {
  const [result] = await db
    .promise()
    .query(`UPDATE booking_room SET id_room = ? WHERE id_booking = ?`, [
      id_room,
      id_booking,
    ]);
  return result;
};

module.exports = {
  createBooking,
  bookingRoom,
  readAllBookings,
  readBooking,
  deleteBooking,
  updateBooking,
  updateBookingRoom,
};
