// Importar módulos para generar las rutas
const express = require("express");
const router = express.Router();

// Llamar las funciones del usuario
const userController = require("../controllers/UserController");

// Ruta para la gestión de usuarios
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/count", userController.countUsers);
router.get("/", userController.getAllUsers);
router.delete("/:id_number", userController.deteleUser);
router.get("/:id_number", userController.readUser);
router.put("/:id", userController.updateUser);

module.exports = router;
