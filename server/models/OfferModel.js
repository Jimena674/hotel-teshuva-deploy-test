const db = require("../config/db");

/** Modelo para leer todas las ofertas. */
const readAllOffers = async () => {
  const [rows] = await db.promise().query(`SELECT
        offer.id_offer,
        offer.title,
        offer.description,
        offer.image_path,
        offer.start_date,
        offer.end_date,
        offer.is_active
        FROM offer
         `);
  return rows;
};

/** Modelo para leer una oferta. */
const readOffer = async (id_offer) => {
  const [rows] = await db
    .promise()
    .query(`SELECT * FROM offer WHERE id_offer = ?`, [id_offer]);
  return rows[0];
};

/** Modelo para crear una oferta. */
const createOffer = async (
  title,
  description,
  image_path,
  start_date,
  end_date
) => {
  const newOffer = await db
    .promise()
    .query(
      `INSERT INTO offer (title, description, image_path, start_date, end_date) VALUES (?, ?, ?, ?, ?)`,
      [title, description, image_path, start_date, end_date]
    );
  return newOffer;
};

/** Modelo para modificar una oferta. */
const updateOffer = async (id_offer, updatedData) => {
  // Se crean dos objetos
  const columns = [];
  const values = [];

  // Se recorren las claves del objeto updatedData
  // Se construye la solicitud SQL de cada columna, ejem: tittle = ?
  // Se obtienen los valores de cada clave o propiedad y se unen en un array en orden
  for (let key in updatedData) {
    columns.push(`${key} = ?`);
    values.push(updatedData[key]);
  }

  const sql = `UPDATE offer SET ${columns.join(", ")} WHERE id_offer = ?`;
  values.push(id_offer);

  // Solicitud a la base de datos
  const [result] = await db.promise().query(sql, values);

  return result;
};

/** Modelo para eliminar una oferta */
const deleteOffer = async (id_offer) => {
  const [result] = await db
    .promise()
    .query(`DELETE FROM offer WHERE id_offer = ?`, [id_offer]);
  return result;
};
module.exports = {
  readAllOffers,
  readOffer,
  createOffer,
  updateOffer,
  deleteOffer,
};
