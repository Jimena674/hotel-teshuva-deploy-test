// Mockear db.promise().query
jest.mock("../config/db.js", () => ({
  promise: () => ({
    query: jest.fn(),
  }),
}));
// Mock de la bd
const db = require("../config/db");
// Importar el modelo al que se le realizan las pruebas y que usa el mock
const userModel = require("../models/UserModel");

describe("findUserByEmail", () => {
  test("Devuelve un usuario según su email", async () => {
    // Asignar los valores en base de datos
    db.promise = () => ({
      query: jest
        .fn()
        .mockResolvedValue([[{ id: 1, email: "gabriel@email.com" }]]),
    });
    // Mockear el input para la consulta
    const email = "gabriel@email.com";
    // Ejecutar la consulta
    const user = await userModel.findUserByEmail(email);
    expect(user).toEqual({ id: 1, email: "gabriel@email.com" });
  });

  test("Si el correo no existe devuelve un mensaje de error", async () => {
    //Mockear que la consulta devuelve un array vacío
    db.promise = jest.fn().mockReturnValue({
      query: jest.fn().mockResolvedValue([[]]),
    });
    //Mockear el input
    const email = "";
    //Ejecutar la consulta
    const user = await userModel.findUserByEmail(email);
    expect(user).toEqual({ error: "Usuario no encontrado." });
  });
});

describe("createUser", () => {
  test("Crea un usuario en BD.", async () => {
    const newUser = {
      //Mockear el input
      name: "Brayan",
      last_name: "Pérez",
      id_type_id: "Cédula",
      id_number: "10182150014",
    };
    //Ejecutar la consulta
    const user = await userModel.createUser(newUser);
    expect(user).toEqual(expect.objectContaining(user));
  });
});

describe("countUsers", () => {
  test("Se obtiene la cantidad total de usuarios en DB.", async () => {
    //Simular total en DB
    db.promise = jest.fn().mockReturnValue({
      query: jest.fn().mockResolvedValue([[{ total: 2 }]]),
    });
    //Ejecutar consulta
    const countUsers = await userModel.countUsers();
    //Prueba
    expect(countUsers).toBe(2);
  });
});

describe("getAllUsers", () => {
  test("Se leen todos los usuarios en DB.", async () => {
    //Simular usuarios en DB
    db.promise = jest.fn().mockReturnValue({
      query: jest.fn().mockResolvedValue([
        [
          { id: 1, email: "gabriel@email.com" },
          { id: 2, email: "brayan@email.com" },
        ],
      ]),
    });
    //Ejecutar consulta del modelo
    const getAllUsers = await userModel.getAllUsers();
    //Prueba
    expect(getAllUsers).toEqual([
      { id: 1, email: "gabriel@email.com" },
      { id: 2, email: "brayan@email.com" },
    ]);
  });
});
