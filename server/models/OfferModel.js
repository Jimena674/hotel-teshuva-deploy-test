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

module.exports = { readAllOffers, readOffer, createOffer };
