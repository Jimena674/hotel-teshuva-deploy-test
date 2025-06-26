const db = require("../config/db");
const offerModel = require("../models/OfferModel");

/** Función para leer todas las ofertas */
const readAllOffers = async (req, res) => {
  try {
    const getAll = await offerModel.readAllOffers();
    res.status(200).json(getAll);
    console.log("Las ofertas existentes son: ");
    console.log(getAll);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor." });
    console.log("Error al leer todas las ofertas.", error);
  }
};

/** Función para leer una oferta */
const readOffer = async (req, res) => {
  try {
    // Dato enviado por el usuario
    const idOffer = req.params.id_offer;
    // Conexión con la base de datos
    const offer = await offerModel.readOffer(idOffer);
    // Verificar si la oferta existe
    if (!offer) {
      res.status(404).json({ error: "La oferta no existe." });
    }
    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor." });
    console.log("Error al leer la oferta.", error);
  }
};

/** Función para crear una oferta */

const createOffer = async (req, res) => {
  try {
    // Datos enviados por el usuario
    const { title, description, image_path, start_date, end_date } = req.body;

    // Verificar si se enviaron todos los datos
    if (!title || !description || !image_path || !start_date || !end_date) {
      res.status(404).json({ error: "Todos los campos son obligatorios." });
    }

    // Crear la oferta
    const newOffer = await offerModel.createOffer(
      title,
      description,
      image_path,
      start_date,
      end_date
    );
    console.log("La nueva oferta es: ");
    console.log(newOffer);

    res.status(200).json({ message: "Oferta creada con éxito." });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor." });
    console.log("Error al crear la oferta.", error);
  }
};

/** Función para modificar una oferta */
const updateOffer = async (req, res) => {
  // Datos que suministra el usuario
  const idOffer = req.params.id_offer;
  const updatedData = req.body;
  try {
    // Datos existentes en la base de datos
    const [actualOffer] = await db
      .promise()
      .query(`SELECT * FROM offer WHERE id_offer = ?`, [idOffer]);
    const originalOffer = actualOffer[0];

    console.log("La infomación existente de la oferta es: ");
    console.log(originalOffer);

    // Nuevos valores para la oferta
    const newData = {
      title: updatedData.title?.trim(),
      description: updatedData.description,
      image_path: updatedData.image_path?.trim(),
      start_date: updatedData.start_date?.trim(),
      end_date: updatedData.end_date?.trim(),
    };

    console.log("Los nuevos datos de la oferta son: ");
    console.log(newData);

    // Comparar los valores existente con los nuevos
    const changes = Object.entries(newData).some(([key, value]) => {
      const originalValue = originalOffer[key];
      // Si los valores son fechas
      const isDateField = key === "start_date" || key === "end_date";
      if (isDateField) {
        const newDate = new Date(value).toISOString().slice(0, 10);
        const originalDate = new Date(originalValue).toISOString().slice(0, 10);
        return newDate !== originalDate;
      }
      // Convertir a String para comparar de manera segura
      return String(value).trim() === String(originalValue).trim();
    });

    // Verificar si no hubo cambios en los valores
    if (!changes) {
      return res
        .status()
        .json({ error: "No se realizaron cambios en los datos." });
    }

    // Comunicarse con las base de datos
    const result = await offerModel.updateOffer(idOffer, newData);

    res.status(200).json({ message: "Oferta actualizada con éxito." });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor." });
    console.log("Error al actualizar la oferta.", error);
  }
};

module.exports = { readAllOffers, readOffer, createOffer, updateOffer };
