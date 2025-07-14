// Importar módulo para interactuar con la base de datos
const db = require("../config/db");

{
  /*Buscar un usuario por el email en la BD*/
}
const findUserByEmail = async (email) => {
  const [rows] = await db
    .promise()
    .query(
      "SELECT user.*, user_type.name AS user_type FROM user JOIN user_type ON user.id_user_type = user_type.id_user_type WHERE user.email= ?",
      [email]
    );
  if (rows.length === 0) {
    return { error: "Usuario no encontrado." };
  }
  return rows[0];
};

{
  /*Crear un usuario en la BD*/
}

const createUser = async (
  name,
  last_name,
  id_type_id,
  id_number,
  phone,
  birth_date,
  email,
  id_user_type,
  hashedPassword
) => {
  const [result] = await db
    .promise()
    .query(
      "INSERT INTO user (name, last_name, id_type_id, id_number, phone, birth_date, email, id_user_type, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        last_name,
        id_type_id,
        id_number,
        phone,
        birth_date,
        email,
        id_user_type,
        hashedPassword,
      ]
    );
  return result;
};

{
  /*Total de usuarios*/
}

const countUsers = async () => {
  const [rows] = await db.promise().query("SELECT COUNT(*) AS total FROM user");
  return rows[0].total;
};

{
  /*Mostrar todos los usuarios*/
}

const getAllUsers = async () => {
  const [rows] = await db
    .promise()
    .query(
      `SELECT user.id, user.name, user.last_name ,user.id_number, user.phone, user.email, user_type.name AS user_type FROM user JOIN user_type ON user.id_user_type = user_type.id_user_type`
    );
  return rows;
};

{
  /*Función para verificar si un usuario tiene reservas antes de ser eliminado*/
}

const hasBooking = async (id_user) => {
  const [rows] = await db
    .promise()
    .query(`SELECT id_booking FROM booking WHERE id_user = ?`, [id_user]);
  return rows[0];
};

{
  /*Eliminar un usuario por el número de identificación*/
}
const deleteUser = async (id_number) => {
  const [result] = await db
    .promise()
    .query(`DELETE FROM user WHERE id_number = ?`, [id_number]);
  return result;
};

{
  /*Consultar la información de un usuario*/
}
const readUser = async (id_number) => {
  const [rows] = await db
    .promise()
    .query(
      `SELECT user.*, user_type.name AS user_type, id_type.name AS id_type FROM user JOIN user_type ON user.id_user_type = user_type.id_user_type JOIN id_type ON user.id_type_id = id_type.id_type_id WHERE user.id_number = ?`,
      [id_number]
    );
  return rows[0]; // Devuelve el primer usuario encontrado
};

{
  /*Actualizar la información de un usuario*/
}
const updateUser = async (id, updatedData) => {
  const fields = [];
  const values = [];

  // Se recorren los datos del objeto y se arma el SQL dinámicamente
  for (let key in updatedData) {
    fields.push(`${key} = ?`);
    values.push(updatedData[key]);
  }

  const sql = `UPDATE user SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  const [result] = await db.promise().query(sql, values);
  return result;
};

module.exports = {
  findUserByEmail,
  createUser,
  countUsers,
  getAllUsers,
  hasBooking,
  deleteUser,
  readUser,
  updateUser,
};
