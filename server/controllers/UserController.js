// Importar módulos para gestionar las req, res, errores y lógica de la conexión a la bd
const bcrypt = require("bcrypt");
const userModel = require("../models/UserModel");

// Función para crear un usuario
const register = async function (req, res) {
  try {
    // Datos enviados por el usuario
    const {
      name,
      last_name,
      id_type_id,
      id_number,

      phone,
      birth_date,
      email,
      user_type_id,
      password,
    } = req.body;
    // Validar la entrada de datos
    if (
      !name ||
      !last_name ||
      !id_type_id ||
      !id_number ||
      !phone ||
      !birth_date ||
      !email ||
      !user_type_id ||
      !password
    ) {
      return res
        .status(400)
        .json({ message: "Todos los campos son necesarios." });
    }
    // Verificar si el usuario ya existe
    const user = await userModel.findUserByEmail(email);
    if (user) {
      return res.status(409).json({ message: "El usuario ya existe." });
    }
    // Encriptar la contraseña
    const clearPassword = String(password).trim();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(clearPassword, salt);
    // Crear usuario
    await userModel.createUser(
      name,
      last_name,
      id_type_id,
      id_number,

      phone,
      birth_date,
      email,
      user_type_id,
      hashedPassword
    );

    res.json({ message: "Usuario creado con éxito." });
  } catch (error) {
    console.error("Error al crear el usuario.", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

module.exports = { register };
