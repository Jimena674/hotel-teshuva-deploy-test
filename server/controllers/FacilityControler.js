const facilityModel = require("../models/FacilityModel");

/** Función para obtener todas los servicios de las habitaciones */

const getAllFacilities = async (req, res) => {
  try {
    const facilities = await facilityModel.getAllFacilities();
    res.status(200).json(facilities);
  } catch (error) {
    console.error("Error al leer los datos de los servicios.", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

module.exports = { getAllFacilities };
