const db = require("../config/db");

/** Modelo para leer todas las ofertas. */
const readAllOffers = async () => {
  const [rows] = await db.promise().query(`SELECT
        offer.title,
        offer.description,
        offer.image_path,
        offer.start_date,
        offer.end_date,
        offer.is_active
         `);
  return rows;
};

/** Modelo para leer una oferta. */

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

module.exports = { readAllOffers, createOffer };
