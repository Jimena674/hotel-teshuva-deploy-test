import { useEffect, useState } from "react"; //Hooks de react

export default function UsersDBAdmin() {
  // Definir un estado para el total de usuarios registrados
  const [totalUsers, setTotalUsers] = useState(null); //Variable de estado que inicializa como null

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/user/count"); // Se almacena la respuesta del backend
        const data = await res.json(); // Se parsea la respuesta del servidor en formato JSON
        setTotalUsers(data.total);
      } catch (error) {
        console.error("Error al obtener el total de usuarios: ", error);
      }
    };

    fetchTotal();
  }, []);

  {
    /* Estado para mostrar la información de los usuarios */
  }
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/user/");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error al traer la información de los usuarios: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Definir un estado para la barra de búsqueda de usuarios
  const [search, setSearch] = useState("");

  // Definir un estado para filtrar por el tipo de usuario
  const [userTypeFilter, setUserTypeFilter] = useState(
    "todos",
    "cliente",
    "administrativo"
  );

  // Filtrar usuarios por nombre, número de identificación y correo
  const filterUsers = user.filter((user) => {
    const searchBar =
      `${user.name} ${user.last_name} ${user.id_number} ${user.email}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const searchType =
      userTypeFilter === "todos" ||
      user.user_type.toLowerCase() === userTypeFilter.toLowerCase();

    return searchBar && searchType;
  });

  {
    /* Estado para eliminar un usuario por el id_number */
  }

  const deleteUser = async (id_number) => {
    try {
      // Llamar a la función del backend usando fetch
      const res = await fetch(`http://localhost:4000/api/user/${id_number}`, {
        method: "DELETE",
      });

      // Parsear la respuesta del servidor en formato json
      const data = await res.json();

      // Validar el resultado de la operación
      if (res.ok) {
        alert("Usuario eliminado con éxito");

        // Actualizar la lista de usuarios
        setUser((prev) => prev.filter((user) => user.id_number !== id_number));
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("", error);
      alert("Ocurrió un error al eliminar el usuario.");
    }
  };

  {
    /* Estado para consular todos los datos de un usuarios */
  }

  const [selectUser, setSelectUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //Función para abrir el modal y consultar los datos de un usuario
  const readUser = async (id_number) => {
    try {
      // Llamar a la función del backend
      const res = await fetch(`http://localhost:4000/api/user/${id_number}`);
      const data = await res.json();

      setSelectUser(data); //Información que aparece en el modal
      setShowModal(true);
    } catch (error) {
      console.error("Error al consultar usuario", error);
      alert("No se pudo obtener la información del usuario.");
    }
  };

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
            className="form-control me-2"
            type="text"
            placeholder="Buscar usuario por nombre, correo o documento de identidad"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </form>
        <button type="button" className="mt-4">
          Crear un usuario
        </button>
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
                {/* Seleccionar el tipo de usuario */}
                <th scope="col">
                  <select
                    id="hr-select"
                    className="form-select"
                    value={userTypeFilter}
                    onChange={(e) => setUserTypeFilter(e.target.value)}
                  >
                    <option value="todos" disabled hidden>
                      Tipo de usuario
                    </option>
                    <option value="todos">Todos</option>
                    <option value="cliente">Clientes</option>
                    <option value="administrativo">Administrativos</option>
                  </select>
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            {/* Cuerpo de la tabla */}
            <tbody>
              {filterUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name + " " + user.last_name}</td>
                  <td>{user.id_number}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.user_type}</td>
                  {/* Funciones GET, DELETE, PUT */}
                  <td>
                    <div className="dropdown">
                      <button
                        className="dropdown-toggle booking-form-btn"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="bi bi-three-dots-vertical"></i>
                      </button>
                      <ul className="dropdown-menu ">
                        {/* GET */}
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => readUser(user.id_number)}
                          >
                            Consultar
                          </button>
                        </li>
                        {/* PUT */}
                        <li>
                          <button className="dropdown-item" type="button">
                            Modificar
                          </button>
                        </li>
                        {/* DELETE */}
                        <li>
                          <button
                            className="dropdown-item text-danger"
                            onClick={() => deleteUser(user.id_number)}
                            type="button"
                          >
                            Eliminar
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* Modal para realizar solicitudes HTTP*/}
        {showModal && selectUser && (
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title title-medium">
                    Información del usuarios
                  </h1>
                  <button
                    className="btn-close"
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>Nombre: </strong>
                    {selectUser.name + " " + selectUser.last_name}
                  </p>
                  <p>
                    <strong>Documento de identidad: </strong>
                    {selectUser.id_type + " : " + selectUser.id_number}
                  </p>
                  <p>
                    <strong>Celular: </strong>
                    {selectUser.phone}
                  </p>
                  <p>
                    <strong>Fecha de nacimiento: </strong>
                    {selectUser.birth_date}
                  </p>
                  <p>
                    <strong>Correo electrónico: </strong>
                    {selectUser.email}
                  </p>
                  <p>
                    <strong>Tipo de usuario: </strong>
                    {selectUser.user_type}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
