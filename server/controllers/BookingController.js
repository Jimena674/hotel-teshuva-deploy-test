const bookingModel = require("../models/BookingModel");
const roomModel = require("../models/RoomModel");
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

    const { id_number, check_in, check_out, room_number, total } = req.body;
    console.log(
      "Los datos ingresados son: " + id_number,
      check_in,
      check_out,
      room_number,
      total
    );

    // Validar que se hayan ingresado todos los datos

    if (!id_number || !check_in || !check_out || !room_number || !total) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios." });
    }

    // Verificar que el room_number existe
    const room = await roomModel.findRoom(room_number);
    console.log("La habitación es: ");
    console.log(room);

    if (!room) {
      return res.status(409).json({ message: "La habitación no existe." });
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

    // Obtener el id_room del room_number
    const [roomResult] = await db
      .promise()
      .query("SELECT id_room FROM room WHERE room_number = ?", [room_number]);

    const id_room = roomResult[0]?.id_room;
    console.log("El id_room es: " + id_room);

    if (!id_room) {
      return res.status(404).json({ message: "No se encontró la habitación." });
    }

    // Enviar los datos a la base de datos
    const bookingData = {
      id_number,
      check_in,
      check_out,
      total,
      code,
    };
    console.log("Los datos enviados de la reserva son: ");
    console.log(bookingData);

    // Crear la reserva
    const [result] = await bookingModel.createBooking(bookingData);
    console.log("La reserva creada es: ");
    console.log(result);

    // Obtener el id_booking de la nueva reserva
    const id_booking = result.insertId;
    console.log("El id_booking es: " + id_booking);

    // Crear booking_room
    await bookingModel.bookingRoom({ id_booking, id_room });

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
    const { id_number, check_in, check_out, total } = req.body;

    if (id_number) {
      data.id_number = parseInt(id_number);
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
