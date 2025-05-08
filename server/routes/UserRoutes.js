// Importar módulos para generar las rutas
const express = require("express");
const router = express.Router();

// Llamar las funciones del usuario
const userController = require("../controllers/UserController");

// Ruta para el registro de usuarios
router.post("/register", userController.register);

module.exports = router;
