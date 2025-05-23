const bookingModel = require("../models/BookingModel");

/* Controlador para crear una reserva */

const createBooking = async (req, res) => {
  try {
    // Datos de la solicitud

    const { id_user, check_in, check_out, total, code } = req.body;

    // Validar que se hayan ingresado todos los datos

    if (!id_user || !check_in || !check_out || !total || !code) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios." });
    }

    // Verificar que la reserva no exista

    const booking = await bookingModel.findBooking(code);

    if (booking) {
      return res.status(409).json({ message: "La reserva ya existe." });
    }

    // Enviar los datos a la base de datos

    await bookingModel.createBooking(id_user, check_in, check_out, total, code);
    res.status(200).json({ message: "Reserva creada con éxito." });
  } catch (error) {
    console.error("Error al crear la reserva: ", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

/* Controlador para leer todas las reservas */

const readAllBookings = async (req, res) => {};

/* Controlador para leer una reserva */

const readBooking = async (req, res) => {};

/* Controlador para eliminar una reserva */

const deleteBooking = async (req, res) => {};

/* Controlador para modificar una reserva */

const updateBooking = async (req, res) => {};

module.exports = {
  createBooking,
  readAllBookings,
  readBooking,
  deleteBooking,
  updateBooking,
};
