// Importar módulo para interactuar con la base de datos
const db = require("../config/db");

// Buscar un usuario por el email
const findUserByEmail = async (req, res) => {
  const [rows] = await db
    .promise()
    .query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

module.exports = { findUserByEmail };
