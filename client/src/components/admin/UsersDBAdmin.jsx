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

  const [selectUserRead, setSelectUserRead] = useState(null);
  const [showModalRead, setShowModalRead] = useState(false);

  //Función para abrir el modal y consultar los datos de un usuario
  const readUser = async (id_number) => {
    try {
      // Llamar a la función del backend
      const res = await fetch(`http://localhost:4000/api/user/${id_number}`);
      const data = await res.json();

      setSelectUserRead(data); //Información que aparece en el modal
      setShowModalRead(true);
    } catch (error) {
      console.error("Error al consultar la información del usuario", error);
      alert("No se pudo obtener la información del usuario.");
    }
  };

  {
    /* Estado para modificar los datos de un usuario */
  }

  const [actualUserUpdate, setActualUserUpdate] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  // Función para abrir el modal y modificar los datos de un usuario
  const updateUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/user/${id}`);
      const data = await res.json();
      setActualUserUpdate(data);
      setUpdatedUser(data);
      setShowModalUpdate(true);
    } catch (error) {
      console.error("Error al modificar los datos del usuario :", error);
      alert("No se pudo modificar los datos del usuario.");
    }
  };

  const updateUserInState = (updatedUser) => {
    setUser((prevUser) =>
      prevUser.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  {
    /* Enviar los datos de la actualización al backend */
  }
  const saveUpdate = async (user) => {
    try {
      const res = await fetch(`http://localhost:4000/api/user/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.ok) {
        updateUserInState(user);
        alert("Usuario actualizado correctamente.");
        setShowModalUpdate(false);
      } else {
        alert("Error al actualizar el usuario: " + data.message);
      }
    } catch (error) {
      console.error("Error al enviar los cambios: ", error);
    }
  };

  const idType = [
    { id: 1, name: "Cédula" },
    { id: 2, name: "Tarjeta de identidad" },
    { id: 3, name: "Pasaporte" },
    { id: 4, name: "Cédula de extranjería" },
  ];

  const idUserType = [
    { id: 1, name: "Cliente" },
    { id: 2, name: "Administrativo" },
  ];

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
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => updateUser(user.id_number)}
                          >
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
        {/* Modal para consultar la información del usuario*/}
        {showModalRead && selectUserRead && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title title-medium">
                    Consultar la información del usuarios
                  </h1>
                  <button
                    className="btn-close"
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowModalRead(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>Nombre: </strong>
                    {selectUserRead.name + " " + selectUserRead.last_name}
                  </p>
                  <p>
                    <strong>Documento de identidad: </strong>
                    {selectUserRead.id_type + " : " + selectUserRead.id_number}
                  </p>
                  <p>
                    <strong>Celular: </strong>
                    {selectUserRead.phone}
                  </p>
                  <p>
                    <strong>Fecha de nacimiento: </strong>
                    {selectUserRead.birth_date}
                  </p>
                  <p>
                    <strong>Correo electrónico: </strong>
                    {selectUserRead.email}
                  </p>
                  <p>
                    <strong>Tipo de usuario: </strong>
                    {selectUserRead.user_type}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Modal para modificar la información del usuario*/}
        {showModalUpdate && actualUserUpdate && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title title-medium">
                    Modificar la información del usuarios
                  </h1>
                  <button
                    className="btn-close"
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowModalUpdate(false)}
                  ></button>
                </div>
                <div className="modal-body table-responsive">
                  <table className="table table-striped-columns table-bordered align-middle">
                    <thead>
                      <tr>
                        <th scope="col">Dato</th>
                        <th scope="col">Valor actual</th>
                        <th scope="col">Nuevo valor</th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider">
                      <tr>
                        <th scope="row">Nombres</th>
                        <td>{actualUserUpdate.name}</td>
                        <td>
                          <input
                            type="text"
                            className={
                              "form-control" +
                              (updatedUser.name !== actualUserUpdate.name
                                ? "bg-warning"
                                : "")
                            }
                            value={updatedUser.name}
                            onChange={(e) =>
                              setUpdatedUser({
                                ...updatedUser,
                                name: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Apellidos</th>
                        <td>{actualUserUpdate.last_name}</td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={updatedUser.last_name}
                            onChange={(e) =>
                              setUpdatedUser({
                                ...updatedUser,
                                last_name: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Documento de identidad</th>
                        <td>{actualUserUpdate.id_type}</td>
                        <td>
                          <label htmlFor="idType">Tipo de documento</label>
                          <select
                            id="idType"
                            className="form-select"
                            value={updatedUser.id_type_id}
                            onChange={(e) =>
                              setUpdatedUser({
                                ...updatedUser,
                                id_type_id: parseInt(e.target.value),
                              })
                            }
                          >
                            {idType.map((type) => (
                              <option key={type.id} value={type.id}>
                                {type.name}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Número de identificación</th>
                        <td>{actualUserUpdate.id_number}</td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={updatedUser.id_number}
                            onChange={(e) =>
                              setUpdatedUser({
                                ...updatedUser,
                                id_number: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Número de celular</th>
                        <td>{actualUserUpdate.phone}</td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={updatedUser.phone}
                            onChange={(e) =>
                              setUpdatedUser({
                                ...updatedUser,
                                phone: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Fecha de nacimiento</th>
                        <td>{actualUserUpdate.birth_date}</td>
                        <td>
                          <input
                            type="date"
                            className="form-control"
                            value={updatedUser.birth_date}
                            onChange={(e) =>
                              setUpdatedUser({
                                ...updatedUser,
                                birth_date: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Correo electrónico</th>
                        <td>{actualUserUpdate.email}</td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={updatedUser.email}
                            onChange={(e) =>
                              setUpdatedUser({
                                ...updatedUser,
                                email: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Tipo de usuario</th>
                        <td>{actualUserUpdate.user_type}</td>
                        <td>
                          <label htmlFor="userType">Tipo de usuario</label>
                          <select
                            id="userType"
                            className="form-select"
                            value={updatedUser.id_user_type}
                            onChange={(e) =>
                              setUpdatedUser({
                                ...updateUser,
                                id_user_type: e.target.value,
                              })
                            }
                          >
                            {idUserType.map((type) => (
                              <option key={type.id} value={type.id}>
                                {type.name}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Contraseña</th>
                        <td className="cell-medium">
                          {actualUserUpdate.password}
                        </td>
                        <td>
                          <input
                            type="password"
                            className="form-control"
                            value={updatedUser.password}
                            onChange={(e) =>
                              setUpdatedUser({
                                ...updatedUser,
                                password: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="modal-footer">
                    <button
                      className="booking-form-btn"
                      onClick={() => saveUpdate(updatedUser)}
                    >
                      Guardar
                    </button>
                    <button
                      className="booking-form-btn"
                      onClick={() => setShowModalUpdate(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
