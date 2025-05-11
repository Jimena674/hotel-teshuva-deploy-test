// Importar módulo para interactuar con la base de datos
const db = require("../config/db");

// Buscar un usuario por el email en la BD
const findUserByEmail = async (email) => {
  const [rows] = await db
    .promise()
    .query(
      "SELECT users.*, user_types.user_type AS user_type FROM users JOIN user_types ON users.user_type_id = user_types.user_type_id WHERE users.email= ?",
      [email]
    );
  return rows[0];
};

// Crear un usuario en la BD
const createUser = async (
  name,
  last_name,
  id_type_id,
  id_number,

  phone,
  birth_date,
  email,
  user_type_id,
  hashedPassword
) => {
  await db
    .promise()
    .query(
      "INSERT INTO users (name, last_name, id_type_id, id_number, phone, birth_date, email, user_type_id, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        last_name,
        id_type_id,
        id_number,

        phone,
        birth_date,
        email,
        user_type_id,
        hashedPassword,
      ]
    );
};

module.exports = { findUserByEmail, createUser };
