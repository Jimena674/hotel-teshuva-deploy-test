const db = require("../config/db");

/* Modelo para crear una reserva */

const createBooking = async (data) => {
  const { id_user, check_in, check_out, total, code } = data;
  await db
    .promise()
    .query(
      `INSERT INTO booking ( id_user, check_in, check_out, total, code) VALUES ( ?, ?, ?, ?, ?)`,
      [id_user, check_in, check_out, total, code]
    );
};

/* Modelo para leer todas las reserva */

const readAllBookings = async () => {
  const [rows] = await db
    .promise()
    .query(
      `SELECT booking.id_booking, booking.id_user, booking.check_in, booking.check_out, booking.total, booking.code, user.name AS user_name, room.room_number AS room FROM booking JOIN user ON booking.id_user = user.id JOIN booking_room ON booking.id_booking = booking_room.id_booking JOIN room ON booking_room.id_room = room.id_room`
    );
  return rows;
};

/* Modelo para leer una reserva a partir del id_booking*/

const readBooking = async (code) => {
  const [rows] = await db
    .promise()
    .query(
      `SELECT booking.*, user.name AS user_name, room.room_number AS room FROM booking JOIN user ON booking.id_user = user.id JOIN booking_room ON booking.id_booking = booking_room.id_booking JOIN room ON booking_room.id_room = room.id_room WHERE code = ?`,
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

module.exports = {
  createBooking,
  readAllBookings,
  readBooking,
  deleteBooking,
  updateBooking,
};
