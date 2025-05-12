// Importar módulos para generar las rutas
const express = require("express");
const router = express.Router();

// Llamar las funciones del usuario
const userController = require("../controllers/UserController");

// Ruta para el registro de usuarios
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/count", userController.countUsers);

module.exports = router;
