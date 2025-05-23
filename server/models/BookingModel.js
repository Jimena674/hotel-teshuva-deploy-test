const db = require("../config/db");

/* Modelo para crear una reserva */

const createBooking = async (id_user, check_in, check_out, total, code) => {
  await db
    .promise()
    .query(
      `INSERT INTO booking (id_user, check_in, check_out, total, code) VALUES (?, ?, ?, ?, ?)`,
      [id_user, check_in, check_out, total, code]
    );
};

/* Buscar una reserva por el código */

const findBooking = async (code) => {
  const [rows] = await db
    .promise()
    .query(`SELECT booking WHERE booking.code = ?`, [code]);
  return rows[0];
};

/* Modelo para leer todas las reserva */

const readAllBookings = async () => {
  await db.promise().query();
};

/* Modelo para leer una reserva */

const readBooking = async () => {
  await db.promise().query();
};

/* Modelo para eliminar una reserva */

const deleteBooking = async () => {
  await db.promise().query();
};

/* Modelo para modificar una reserva */

const updateBooking = async () => {
  await db.promise().query();
};

module.exports = {
  createBooking,
  findBooking,
  readAllBookings,
  readBooking,
  deleteBooking,
  updateBooking,
};
