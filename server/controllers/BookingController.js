const bookingModel = require("../models/BookingModel");
const db = require("../config/db");

/* Función para crear un código de reserva */

function bookingCode(length = 8) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * characters.length);
    result += characters[index];
  }
  return result;
}

/* Controlador para crear una reserva */

const createBooking = async (req, res) => {
  try {
    // Datos de la solicitud

    const { id_user, check_in, check_out, total } = req.body;

    // Validar que se hayan ingresado todos los datos

    if (!id_user || !check_in || !check_out || !total) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios." });
    }

    let code;
    let uniqueCode = false;

    while (!uniqueCode) {
      code = bookingCode();
      const [exist] = await db
        .promise()
        .query(`SELECT id_booking FROM booking WHERE code = ?`, [code]);
      if (exist.length === 0) {
        uniqueCode = true;
      }
    }

    // Enviar los datos a la base de datos

    const bookingData = { id_user, check_in, check_out, total, code };
    await bookingModel.createBooking(bookingData);
    res.status(200).json({ message: "Reserva creada con éxito." });
  } catch (error) {
    console.error("Error al crear la reserva: ", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

/* Controlador para leer todas las reservas */

const readAllBookings = async (req, res) => {
  try {
    const getAll = await bookingModel.readAllBookings();
    res.status(200).json(getAll);
  } catch (error) {
    console.error("Error al leer los datos de todas las reservas: ", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

/* Controlador para leer una reserva */

const readBooking = async (req, res) => {
  try {
    const code = req.params.code;
    const booking = await bookingModel.readBooking(code);
    res.json(booking);
  } catch (error) {
    console.error("Error al leer los datos de la reserva: ", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

/* Controlador para eliminar una reserva */

const deleteBooking = async (req, res) => {
  try {
    const idBooking = req.params.id_booking;
    const result = await bookingModel.deleteBooking(idBooking);
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la reserva: ", error);
    res.status(500).json({ error: "Erro en el servidor" });
  }
};

/* Controlador para modificar una reserva */

const updateBooking = async (req, res) => {
  const code = req.params.code;
  const data = req.body;
  if (!data) {
    res
      .status(400)
      .json({ message: "No se han proporcionado datos para actualizar." });
  }

  try {
    const { id_user, check_in, check_out, total } = req.body;

    if (id_user) {
      data.id_user = parseInt(id_user);
    }
    if (check_in) {
      data.check_in = check_in;
    }
    if (check_out) {
      data.check_out = check_out;
    }
    if (total) {
      data.total = parseFloat(total);
    }

    delete data.user_name;
    delete data.room;

    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ message: "No se proporcionaron datos válidos." });
    }

    const result = await bookingModel.updateBooking(code, data);
    res.status(200).json({ message: "Reserva actualizada con éxito." });
  } catch (error) {
    console.error("Error al modificar la reserva: ", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

module.exports = {
  createBooking,
  readAllBookings,
  readBooking,
  deleteBooking,
  updateBooking,
};
