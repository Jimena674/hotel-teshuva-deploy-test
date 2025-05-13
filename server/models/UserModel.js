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

// Eliminar un usuario por el número de identificación
const deleteUser = async (id_number) => {
  const [result] = await db
    .promise()
    .query(`DELETE FROM users WHERE id_number = ?`, [id_number]);
  return result;
};

// Consultar la información de un usuario
const readUser = async (id_number) => {
  const [rows] = await db
    .promise()
    .query(`SELECT * FROM users WHERE id_number = ?`, [id_number]);
  return rows[0]; // Devuelve el primer usuario encontrado
};

// Actualizar la información de un usuario
const updateUser = async (id_number, updatedData) => {
  const fields = [];
  const values = [];

  // Se recorren los datos del objeto y se arma el SQL dinámicamente
  for (let key in updatedData) {
    fields.push(`${key} = ?`);
    values.push(updatedData[key]);
  }

  // Petición SQL
  const sql = `UPDATE users SET ${fields.join(", ")} WHERE id_number = ?`;
  values.push(id_number);

  //
  const [result] = await db.promise().query(sql, values);
  return result;
};

module.exports = {
  findUserByEmail,
  createUser,
  countUsers,
  getAllUsers,
  deleteUser,
  readUser,
  updateUser,
};
