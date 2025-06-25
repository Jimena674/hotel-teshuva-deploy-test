const roomModel = require("../models/RoomModel");
const db = require("../config/db");

/* Controlador para crear una habitación */
const createRoom = async function (req, res) {
  try {
    // Datos enviados por el usuario

    const {
      room_number,
      rate,
      id_room_type,
      id_room_status,
      id_floor,
      photo_path,
    } = req.body;

    // Validar que se hayan ingresado todos los datos

    if (
      !room_number ||
      !rate ||
      !id_room_type ||
      !id_room_status ||
      !id_floor ||
      !photo_path
    ) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos." });
    }

    // Verificar que la habitación no exista a través del room_number

    const room = await roomModel.findRoom(room_number);
    if (room) {
      return res.status(409).json({ message: "La habitación ya existe." });
    }

    // Crear la habitación
    await roomModel.createRoom(
      room_number,
      rate,
      id_room_type,
      id_room_status,
      id_floor,
      photo_path
    );

    res.json({ message: "Habitación creada con éxito." });
  } catch (error) {
    console.error("Error al crear la habitación: ", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

/* Controlador para eliminar una habitación. */

const deleteRoom = async (req, res) => {
  try {
    // Datos de la solicitud
    const roomNumber = req.params.room_number;

    // Enviar el valor al modelo
    const result = await roomModel.deleteRoom(roomNumber);

    // Verificar si la habitación existe
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "La habitación no existe." });
    }

    res.json({ message: "Habitación eliminada exitosamente." });
  } catch (error) {
    console.error("Error al eliminar la habitación: ", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

/* Controlador para modificar una habitación */

const updateRoom = async (req, res) => {
  // Datos de la solicitud
  const idRoom = req.params.id_room;
  const updatedData = req.body;

  // Validar que se hayan ingresado datos para actualizar la habitación
  if (!idRoom || !updatedData) {
    return res
      .status(400)
      .json({ message: "id de la habitación o Datos faltantes." });
  }

  try {
    // Información existente para comparar
    const [originalRoomArray] = await db
      .promise()
      .query("SELECT * FROM room WHERE id_room = ?", [idRoom]);

    const originalRoom = originalRoomArray[0];

    console.log("La información existente de la habitación es: ");
    console.log(originalRoom);

    if (!originalRoom) {
      return res.status(404).json({ message: "Habitación no encontrada." });
    }

    // Nuevos valores
    const newData = {
      room_number: updatedData.room_number?.trim(),
      rate: parseFloat(updatedData.rate),
      id_room_type: parseInt(updatedData.id_room_type),
      id_room_status: parseInt(updatedData.id_room_status),
      id_floor: parseInt(updatedData.id_floor),
      photo_path: updatedData.photo_path?.trim(),
    };

    console.log("Los datos actualizados son: ");
    console.log(newData);

    // Campos obligatorios
    const mandatoryData = [
      "room_number",
      "rate",
      "id_room_type",
      "id_room_status",
      "id_floor",
    ];

    // Verificar que se hayan ingresado los campos obligatorios
    const missingData = mandatoryData.filter(
      (field) => !newData[field] && newData[field] !== 0
    );

    if (missingData.length > 0) {
      return res
        .status(400)
        .json({ message: "Se deben ingresar todos los campos obligatorio." });
    }

    // Comparar los valores originales con los nuevos
    const changes = Object.entries(newData).some(([key, value]) => {
      const originalValue = originalRoom[key];
      // Si está vacío no comparar
      if (value === undefined || value === "") return false;
      // Si ambos son números
      if (!isNaN(value) && !isNaN(originalValue)) {
        return Number(value) !== Number(originalValue);
      }
      // Convertir a string para compararlos de manera segura
      return String(value).trim() === String(originalValue).trim();
    });

    console.log("¿Se realizaron cambios?: " + changes);

    if (!changes) {
      return res
        .status(400)
        .json({ message: "No se realizaron cambios en los datos." });
    }

    // Eliminar los valores que no son una columna en la tabla
    delete updatedData.room_type;
    delete updatedData.room_status;
    delete updatedData.floor;
    delete updatedData.facility_name;

    // Comunicarse con la base de datos para ejecutar actualización
    const result = await roomModel.updateRoom(idRoom, newData);

    res.json({ message: "Habitación actualizada con éxito." });
  } catch (error) {
    console.error("Error al actualizar los datos de la habitación: ", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

/* Controlador para obtener todos los datos de las habitaciones */

const getAllRooms = async (req, res) => {
  try {
    const rooms = await roomModel.getAllRooms();
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error al obtener los datos de las habitaciones: ", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

/* Controlador para leer los datos de una habitación */

const readRoom = async (req, res) => {
  try {
    // Dato de la solicitud
    const idRoom = req.params.id_room;
    // Datos que se reciben de la base de datos
    const room = await roomModel.readRoom(idRoom);
    // Validar que existe esa habitación
    if (!room) {
      return res.status(400).json({ error: "La habitación no existe." });
    }
    // Si la consulta es exitosa
    res.json(room);
  } catch (error) {
    console.error("Error al leer los datos de la habitación: ", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = { createRoom, deleteRoom, updateRoom, getAllRooms, readRoom };
