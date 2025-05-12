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

// Total de usuarios
const countUsers = async () => {
  const [rows] = await db
    .promise()
    .query("SELECT COUNT(*) AS total FROM users");
  return rows[0].total;
};

// Mostrar todos los usuarios
const getAllUsers = async () => {
  const [rows] = await db
    .promise()
    .query(
      `SELECT users.id, users.name, users.last_name, users.id_number, users.phone, users.email, user_types.user_type AS user_type FROM users JOIN user_types ON users.user_type_id = user_types.user_type_id`
    );
  return rows;
};

module.exports = { findUserByEmail, createUser, countUsers, getAllUsers };
