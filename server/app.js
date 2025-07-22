// Importar módulos para crear el servidor, acceder a las variables env, traer las rutas e impotar la configuración de la base de datos
const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/UserRoutes");
const roomRoutes = require("./routes/RoomRoutes");
const bookingRoutes = require("./routes/BookingRoutes");
const offerRoutes = require("./routes/OfferRoutes");
const cors = require("cors");
require("./config/db");

// Crear el servidor
const app = express(); // Crear una instancia de express
dotenv.config(); // Traer las variebles de entorno de env

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
); // Permitir peticiones desde otro origen

app.use(express.json()); // Parsear las request en formato JSON
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/offer", offerRoutes);

// Definir el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
