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

    const {
      user_id_number,
      check_in,
      check_out,
      room_number,
      total,
      booking_status_name,
    } = req.body;
    console.log(
      "Los datos ingresados son: " + user_id_number,
      check_in,
      check_out,
      room_number,
      total,
      booking_status_name
    );

    // Validar que se hayan ingresado todos los datos

    if (
      !user_id_number ||
      !check_in ||
      !check_out ||
      !room_number ||
      !total ||
      !booking_status_name
    ) {
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

    // Obtener el id del user con el user_id_number
    const [userResult] = await db
      .promise()
      .query(`SELECT id FROM user WHERE id_number = ?`, [user_id_number]);

    const id_user = userResult[0]?.id;
    console.log("El id del usuario es: " + id_user);

    // Obtener el id_booking_status
    const [bookingResult] = await db
      .promise()
      .query(`SELECT id_booking_status FROM booking_status WHERE name = ?`, [
        booking_status_name,
      ]);

    const id_booking_status = bookingResult[0]?.id_booking_status;
    console.log("El id del booking_status es: " + id_booking_status);

    // Enviar los datos a la base de datos
    const bookingData = {
      id_user,
      check_in,
      check_out,
      total,
      code,
      id_booking_status,
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
    console.log(getAll);
  } catch (error) {
    console.error("Error al leer los datos de todas las reservas: ", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

/* Controlador para leer una reserva */

const readBooking = async (req, res) => {
  try {
    // Dato que envía el frontend
    const code = req.params.code;

    const booking = await bookingModel.readBooking(code);
    if (!booking) {
      return res.status(404).json({ message: "El código no existe." });
    }

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
  if (!data || !code) {
    res.status(400).json({ message: "Código y datos faltantes." });
  }

  try {
    // Información existente de booking
    const [originalBookingArray] = await db
      .promise()
      .query(`SELECT * FROM booking WHERE code = ?`, [code]);

    const originalBooking = originalBookingArray[0];
    console.log("Los valores originales del booking son: ");
    console.log(originalBooking);

    // Información existente de booking_room
    const [originalBookingRoomArray] = await db
      .promise()
      .query(`SELECT * FROM booking_room WHERE id_booking = ?`, [
        originalBooking.id_booking,
      ]);
    const originalBookingRoom = originalBookingRoomArray[0];
    console.log("Los valores originales del booking_room son: ");
    console.log(originalBookingRoom);

    // Datos de la solicitud
    const {
      user_id_number,
      check_in,
      check_out,
      room_number,
      total,
      booking_status_name,
    } = req.body;

    // Verificar que se hayan recibido todos los campos obligatorios
    if (
      !user_id_number ||
      !check_in ||
      !check_out ||
      !room_number ||
      !total ||
      !booking_status_name
    ) {
      return res
        .status(409)
        .json({ message: "Se deben ingresar todos los campos obligatorios." });
    }

    // Obtener el id del user con el user_id_number

    const [userResult] = await db
      .promise()
      .query(`SELECT id FROM user WHERE id_number = ?`, [user_id_number]);

    const id_user = userResult[0]?.id;
    console.log("El id del nuevo usuario es: " + id_user);

    // Obtener el id del booking_status
    const [bookingResult] = await db
      .promise()
      .query(`SELECT id_booking_status FROM booking_status WHERE name = ?`, [
        booking_status_name,
      ]);

    const id_status = bookingResult[0]?.id_booking_status;
    console.log("El id del booking_status es: " + id_status);

    // Registrar nuevos valores
    const newData = {
      id_user: id_user,
      check_in: data.check_in?.trim(),
      check_out: data.check_out?.trim(),
      total: parseFloat(data.total),
      id_status: id_status,
    };
    console.log("Los nuevos valores son: ");
    console.log(newData);

    // Verificar que el nuevo room_number existe
    const room = await roomModel.findRoom(room_number);
    console.log("La nueva habitación es: ");
    console.log(room);

    if (!room) {
      return res.status(400).json({ message: "No existe la habitación." });
    }

    // Obtener el id_room del nuevo room_number
    const [roomResult] = await db
      .promise()
      .query(`SELECT id_room FROM room WHERE room_number=?`, [room_number]);
    const id_room = roomResult[0]?.id_room;
    console.log("El id_room de la nueva habitación es: " + id_room);

    // Obtener el id_booking
    const id_booking = originalBooking.id_booking;
    console.log("El id_booking existente es: " + id_booking);

    // Actualizar booking_room
    if (originalBookingRoom.id_room !== id_room) {
      const newBookingRoom = await bookingModel.updateBookingRoom(
        id_booking,
        id_room
      );
      console.log("Los nuevos valores de booking_room son: ");
      console.log(newBookingRoom);
    } else {
      console.log("No hubo cambios en la habitación.");
    }

    // Comparar los valores originales del booking con los nuevos
    const changes = Object.entries(newData).some(([key, value]) => {
      const originalValue = originalBooking[key];
      // Si está vacío no comparar
      if (value === undefined || value === "") return false;
      // Si ambos son números
      if (!isNaN(value) && !isNaN(originalValue)) {
        return Number(value) !== Number(originalValue);
      }
      // Si ambos son fechas
      const isDateField = key === "check_in" || key === "check_out";
      if (isDateField) {
        const newDate = new Date(value).toISOString().slice(0, 10);
        const originalDate = new Date(originalValue).toISOString().slice(0, 10);
        return newDate !== originalDate;
      }
      // Convertir a String para compararlos de manera segura
      return String(value).trim() === String(originalValue).trim();
    });
    console.log("¿Se realizaron cambios?: " + changes);

    if (!changes) {
      return res
        .status(400)
        .json({ message: "No se realizaron cambios en los datos." });
    }

    // Eliminar los valores que no son columnas en la tabla
    delete data.user_name;
    delete data.user_last_name;
    delete data.id_number;
    delete data.room_number;
    delete data.room_rate;
    delete data.booking_status_name;
    // Comunicarse con la base de datos para modificar la reserva
    const result = await bookingModel.updateBooking(code, newData);

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
