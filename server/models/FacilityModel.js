const db = require("../config/db");

/** Modelo para obtener todos los servicios de las habitaciones */
const getAllFacilities = async () => {
  const [rows] = await db.promise().query("SELECT * FROM facility");
  return rows;
};

module.exports = { getAllFacilities };
