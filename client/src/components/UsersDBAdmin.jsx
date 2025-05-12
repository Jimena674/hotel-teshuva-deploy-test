import { useEffect, useState } from "react"; //Hooks de react
import Button from "./Button";

export default function UsersDBAdmin() {
  const [totalUsers, setTotalUsers] = useState(null); //Variable de estado que inicializa como null

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/users/count"); // Se almacena la respuesta del backend
        const data = await res.json(); // Se parsea la respuesta del servidor en formato JSON
        setTotalUsers(data.total);
      } catch (error) {
        console.error("Error al obtener el total de usuarios: ", error);
      }
    };

    fetchTotal();
  }, [totalUsers]); // Array de dependencias: se ejecuta cuando camabia totalUsers

  // Traer la información de todos los usuarios
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/users/");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error al traer la información de los usuarios: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="container-fluid">
        {/*Total de usuarios*/}
        <h1 className="title-large">
          Usuarios Registrados: {totalUsers !== null && `(${totalUsers})`}
        </h1>
        {/*Barra de búsqueda*/}
        <form className="d-flex col-6 mt-4" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Buscar usuario por email o documento de identidad"
            aria-label="Search"
          />
          <Button
            name="Buscar"
            btnCustom="booking-form-btn"
            btnText="label-small"
          />
        </form>
        {/*Tabla de usuarios*/}
        {loading ? (
          <p>Cargando usuarios...</p>
        ) : (
          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col"># ID</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Email</th>
                <th scope="col">Tipo de usuario</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((users, index) => (
                <tr key={users.id}>
                  <td>{index + 1}</td>
                  <td>{users.name + " " + users.last_name}</td>
                  <td>{users.id_number}</td>
                  <td>{users.phone}</td>
                  <td>{users.email}</td>
                  <td>{users.user_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
