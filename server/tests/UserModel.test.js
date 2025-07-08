// Mockear db.promise().query
jest.mock("../config/db.js", () => ({
  promise: () => ({
    query: jest.fn(),
  }),
}));

const db = require("../config/db");

// Se importa el modelo al que se le va a realizar las pruebas unitarias
const { findUserByEmail } = require("../models/UserModel");

// Asignar los valores en base de datos
db.promise = () => ({
  query: jest.fn().mockResolvedValue([[{ id: 1, email: "gabriel@email.com" }]]),
});

test("Devuelve un usuario según su email", async () => {
  // Mockear el input para la consulta
  const email = "gabriel@email.com";
  // Ejecutar la consulta
  const user = await findUserByEmail(email);
  expect(user).toEqual({ id: 1, email: "gabriel@email.com" });
});
