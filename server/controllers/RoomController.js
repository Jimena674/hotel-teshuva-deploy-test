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

    // Datos de la solicitud
    const {
      room_number,
      rate,
      id_room_type,
      id_room_status,
      id_floor,
      photo_path,
    } = req.body;

    // Verificar que se hayan ingresado todos los campos
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
        .json({ message: "Todos los campos son obligatorios." });
    }

    // Validar nuevos valores
    const newData = {
      room_number: updatedData.room_number.trim(),
      rate: parseFloat(updatedData.rate),
      id_room_type: parseInt(updatedData.id_room_type),
      id_room_status: parseInt(updatedData.id_room_status),
      id_floor: parseInt(updatedData.id_floor),
      photo_path: updatedData.photo_path.trim(),
    };

    /*
    if (room_number) {
      updatedData.room_number = room_number.trim();
    }
    if (rate) {
      updatedData.rate = parseFloat(rate);
    }
    if (id_room_type) {
      updatedData.id_room_type = parseInt(id_room_type);
    }
    if (id_room_status) {
      updatedData.id_room_status = parseInt(id_room_status);
    }
    if (id_floor) {
      updatedData.id_floor = parseInt(id_floor);
    }
      if (req.file) {
      updatedData.photo_path = `/images/${req.file.filename}`;
    } else if (photo_path) {
      updatedData.photo_path = photo_path;
    }
    */

    // Guardar la ruta de la imagen

    console.log("Los datos actualizados son: ");
    console.log(newData);

    // Comparar los valores originales con los nuevos
    const noChanges = Object.entries(newData).every(([key, value]) => {
      const originalValue = originalRoom[key];
      return String(value).trim() === String(originalValue).trim();
    });

    console.log("¿No se realizaron cambios?: " + noChanges);

    if (noChanges) {
      return res
        .status(400)
        .json({ message: "No se realizaron cambios en los datos." });
    }

    // Eliminar los valores que no son una columna en la tabla
    delete updatedData.room_type;
    delete updatedData.room_status;
    delete updatedData.floor;

    // Tiene al menos una propiedad válida para actualizar
    if (Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({ message: "No hay campos válidos para actualizar." });
    }

    // Comunicación con el modelo que interactúa con la base de datos
    const result = await roomModel.updateRoom(idRoom, updatedData);

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
