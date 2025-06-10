// Importar módulos para gestionar las req, res, errores y lógica de la conexión a la bd
const bcrypt = require("bcrypt");
const userModel = require("../models/UserModel");
const db = require("../config/db");

{
  /*Función para crear un usuario*/
}
const register = async function (req, res) {
  try {
    // Datos suministrados por el usuario
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
    console.log(
      "Datos ingresados: " + name,
      last_name,
      id_type_id,
      id_number,
      phone,
      birth_date,
      email,
      id_user_type,
      password
    );
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

{
  /*Función para iniciar sesión*/
}

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
      return res.status(404).json({ message: "El correo no existe." });
    }

    // Comparar contraseñas
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    // Inicio de sesión exitoso
    res.status(200).json({
      message: "Inicio de sesión exitoso.",
      // Se devuelven algunos datos para mostrar en el panel administrativo
      type: user.user_type,
      name: user.name,
      last_name: user.last_name,
    });
  } catch (error) {
    console.error("Error al iniciar sesión.", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

{
  /*Total de usuarios registrados*/
}

const countUsers = async (req, res) => {
  try {
    const total = await userModel.countUsers();
    res.status(200).json({ total });
  } catch (error) {
    console.error("Error al contar los usuarios: ", error);
    res.status(500).json({ message: "Error del servidor." });
  }
};

{
  /*Traer todos los usuarios*/
}

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios: ", error);
    res.status(500).json({ message: "Error del servidor." });
  }
};

{
  /*Función para eliminar un usuario*/
}

const deteleUser = async (req, res) => {
  try {
    // Datos de la solicitud

    const idNumber = req.params.id_number;
    const idUser = req.params.id_user;

    const hasBooking = await userModel.hasBooking(idUser);
    console.log("¿Tiene reservas asociadas?: " + hasBooking);
    // Verificar que el usuario no esté en una reserva
    if (hasBooking) {
      return res.status(409).json({
        message:
          "No se puede eliminar el usuario porque tiene reservas asociadas.",
      });
    }

    // Solicitar respuesta a la base de datos
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

{
  /*Función para leer los datos de un usuario*/
}

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

{
  /*Función para actualizar los datos de un usuario*/
}

const updateUser = async (req, res) => {
  // Validar la información suministrada

  const id = req.params.id;
  const updatedData = req.body;

  if (!id || !updatedData) {
    return res.status(400).json({ message: "ID o Datos faltantes." });
  }

  try {
    // Información existente para comparar
    const [originalUserArray] = await db
      .promise()
      .query("SELECT * FROM user WHERE id = ?", [id]);

    const originalUser = originalUserArray[0];

    console.log("La información existente del usuario es: ");
    console.log(originalUser);

    // Datos de la solicitud
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

    // Verificar que se hayan enviado todos los campos del formulario

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
        .json({ message: "Todos los campos son obligatorios." });
    }

    // Registrar los nuevos valores

    const newData = {
      name: updatedData.name?.trim(),
      last_name: updatedData.last_name?.trim(),
      id_type_id: parseInt(updatedData.id_type_id),
      id_number: updatedData.id_number?.trim(),
      phone: updatedData.phone?.trim(),
      birth_date: updatedData.birth_date?.trim(),
      email: updatedData.email?.trim(),
      id_user_type: parseInt(updatedData.id_user_type),
    };

    console.log("Los datos actualizados son: ");
    console.log(newData);

    // Comparar los valores originales con los nuevos.

    const noChanges = Object.entries(newData).every(([key, value]) => {
      const originalValue = originalUser[key];
      const isDateField = key === "birth_date";
      // Normalizar las fechas
      if (isDateField) {
        const newDate = new Date(value).toISOString().slice(0, 10);
        const originalDate = new Date(originalValue).toISOString().slice(0, 10);
        return newDate === originalDate;
      }

      return String(value).trim() === String(originalValue).trim();
    });

    console.log("¿No se realizaron cambios?: " + noChanges);
    console.log("¿No se modificó la contraseña?: " + !updatedData.password);

    // Eliminar la contraseña si está vacía o no se modificó

    if (updatedData.password && updatedData.password.trim() !== "") {
      // solo si se escribió algo nuevo, la encriptas
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(updatedData.password.trim(), salt);
      updatedData.password = hashed;
    } else {
      // si no hay nueva contraseña, eliminar del objeto para que no se sobreescriba
      delete updatedData.password;
    }

    console.log(updatedData.password);

    if (noChanges && !updatedData.password) {
      return res
        .status(400)
        .json({ message: "No se realizaron cambios en los datos." });
    }

    // Eliminar la información que no pertenece a la tabla user

    delete updatedData.user_type;
    delete updatedData.id_type;

    // Modelo que interactúa con la base de datos

    const result = await userModel.updateUser(id, newData);

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
