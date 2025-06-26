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

module.exports = { readAllOffers, createOffer };
