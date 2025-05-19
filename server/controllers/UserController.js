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
      id_user_type,
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
      !id_user_type ||
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
      id_user_type,
      hashedPassword
    );

    res.json({ message: "Usuario creado con éxito." });
  } catch (error) {
    console.error("Error al crear el usuario.", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

// Función para iniciar sesión
const login = async function (req, res) {
  try {
    // Información que envía el usuario
    const { email, password } = req.body;

    // Validar la entrada de datos
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son necesarios." });
    }

    // Verificar si el usuario existe
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "El usuario no existe." });
    }

    // Comparar contraseñas
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    // Inicio de sesión exitoso
    res.status(200).json({
      message: "Inicio de sesión exitoso.",
      type: user.user_type,
      name: user.name,
      last_name: user.last_name,
    }); // Se devuelve un mensaje y algunos datos del usuario
  } catch (error) {
    console.error("Error al iniciar sesión.", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

// Total de usuarios registrados
const countUsers = async (req, res) => {
  try {
    const total = await userModel.countUsers();
    res.status(200).json({ total });
  } catch (error) {
    console.error("Error al contar los usuarios: ", error);
    res.status(500).json({ message: "Error del servidor." });
  }
};

// Traer todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios: ", error);
    res.status(500).json({ message: "Error del servidor." });
  }
};

// Función para eliminar un usuario
const deteleUser = async (req, res) => {
  try {
    // Datos ingrasados
    const idNumber = req.params.id_number;

    // Enviar el valor al modelo que se comunica con la BD
    const result = await userModel.deleteUser(idNumber);

    // Verificar si el usuario existe
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.json({ message: "Usuario eliminado exitosamente." });
  } catch (error) {
    console.error("Error al eliminar el usuario: ", error);
    res.status(500).json({ message: "Error del servidor." });
  }
};

// Función para leer todos los datos de un usuario
const readUser = async (req, res) => {
  try {
    // Datos de la soliditud
    const idNumber = req.params.id_number;
    // Datos que se traen de la BD
    const user = await userModel.readUser(idNumber);
    // Si el usurio no existe:
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontraro." });
    }

    res.json(user);
  } catch (error) {
    console.error("Error al obtener los datos del usuario : ", error);
    res.status(500).json({ message: "Error del servidor." });
  }
};

// Función para actualizar los datos de un usuario
const updateUser = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  if (!id) {
    return res.status(400).json({ message: "id no proporcionado." });
  }

  if (!updatedData) {
    return res.status(400).json({ message: "Datos de usuario vacios." });
  }

  try {
    const {
      name,
      last_name,
      id_type_id,
      id_number,
      phone,
      birth_date,
      email,
      id_user_type,
      password,
    } = req.body;

    if (name) {
      updatedData.name = name.trim();
    }
    if (last_name) {
      updatedData.last_name = last_name.trim();
    }
    if (id_type_id) {
      updatedData.id_type_id = parseInt(id_type_id);
    }
    if (id_number) {
      updatedData.id_number = id_number.trim();
    }
    if (phone) {
      updatedData.phone = phone.trim();
    }
    if (birth_date) {
      updatedData.birth_date = birth_date.trim();
    }
    if (email) {
      updatedData.email = email.trim();
    }
    if (id_user_type) {
      updatedData.id_user_type = parseInt(id_user_type);
    }
    if (password) {
      const clearPassword = String(password).trim();
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(clearPassword, salt);
      updatedData.password = hashedPassword;
    }

    delete updatedData.user_type;
    delete updatedData.id_type;

    // Modelo que interactúa con la base de datos
    const result = await userModel.updateUser(id, updatedData);

    res.json({ message: "Usuario actualizado correctamente." });
  } catch (error) {
    console.error("Error al actualizar los datos del usuario :", error);
    res.status(500).json({ message: "Error en el sevidor." });
  }
};

module.exports = {
  register,
  login,
  countUsers,
  getAllUsers,
  deteleUser,
  readUser,
  updateUser,
};
