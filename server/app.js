// Importar módulos para crear el servidor, acceder a las variables env, traer las rutas e impotar la configuración de la base de datos
const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/UserRoutes");
require("./config/db");

// Crear el servidor
const app = express(); // Crear una instancia de express
dotenv.config(); // Traer las variebles de entorno de env

app.use(express.json()); // Parsear las request en formato JSON
app.use("/api/user", userRoutes);

// Definir el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
