import { useEffect, useState } from "react"; //Hooks de react
import AlertMessage from "../common/AlertMessage";

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
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/user/");
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

  // Definir un estado para la barra de búsqueda de usuarios
  const [search, setSearch] = useState("");

  // Definir un estado para filtrar por el tipo de usuario
  const [userTypeFilter, setUserTypeFilter] = useState(
    "todos",
    "cliente",
    "administrativo"
  );

  // Filtrar usuarios por nombre, número de identificación y correo
  const filterUsers = users.filter((user) => {
    const searchBar =
      `${user.name} ${user.last_name} ${user.id_number} ${user.email}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const searchType =
      userTypeFilter === "todos" ||
      user.user_type.toLowerCase() === userTypeFilter.toLowerCase();

    return searchBar && searchType;
  });

  // Estado para abrir el modal y crear un usuario

  const [showModalRegister, setShowModalRegister] = useState(false);
  const [userRegister, setUserRegister] = useState([]);
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [id_type_id, setIdTypeId] = useState("");
  const [id_number, setIdNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [id_user_type, setIdUserType] = useState("");
  const [password, setPassword] = useState("");
  const [messageRegister, setMessageRegister] = useState("");
  const [messageType, setMessageType] = useState("");

  {
    /* Función para abrir el modal para crear un usuario */
  }

  const registerUser = async (user) => {
    setShowModalRegister(true);
    setUserRegister(user);
  };

  {
    /** Volver a llamar todos los usuarios cuando se agregue uno nuevo */
  }

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:4000/api/user/");
    const data = await res.json();
    setUsers(data);
  };

  {
    /* Función para guardar el usuario en la base de datos */
  }

  const saveRegister = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          last_name,
          id_type_id,
          id_number,
          phone,
          birth_date,
          email,
          id_user_type,
          password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setName("");
        setLastName("");
        setIdTypeId("");
        setIdNumber("");
        setPhone("");
        setBirthDate("");
        setEmail("");
        setIdUserType("");
        setPassword("");
        setMessageRegister("✅ Registro exitoso");
        setMessageType("success");
        // Cerra el modal
        setShowModalRegister(false);
        // Actualizar la tabla
        await fetchUsers();
      } else {
        setMessageRegister(
          `❌ ${data.message || "Error al registrar el usuario."}`
        );
        setMessageType("error");
      }
    } catch (error) {
      setMessageRegister("❌ Error de conexión con el servidor.");
      setMessageType("error");
      console.error(error);
    }
  };

  // Estado para abrir el modal y eliminar un usuario

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedUserDelete, setSelectedUserDelete] = useState(null);
  const [messageDelete, setMessageDelete] = useState("");

  {
    /* Función para abrir el modal para eliminar un usuario */
  }

  const deleteUser = async (user) => {
    setMessageDelete("");
    setSelectedUserDelete(user);
    setShowModalDelete(true);
  };

  {
    /* Función para actualizar los campos en la tabla */
  }

  const saveDelete = async (user) => {
    try {
      // Llamar a la función del backend usando fetch
      const res = await fetch(
        `http://localhost:4000/api/user/${user.id_number}`,
        {
          method: "DELETE",
        }
      );

      // Parsear la respuesta del servidor en formato json
      const data = await res.json();

      // Validar el resultado de la operación
      if (res.ok) {
        setMessageDelete("✅ Usuario eliminado con éxito.");
        setMessageType("success");
        // Actualizar la lista de usuarios
        await fetchUsers();
      } else {
        setMessageDelete(
          `❌ ${data.message || "Error al eliminar el usuario."}`
        );
        setMessageType("error");
      }
    } catch (error) {
      setMessageDelete(
        "❌ Error de conexión con el servidor para eliminar el usuario."
      );
      messageType("error");
      console.error("Error al eliminar el usuario", error);
      alert("Ocurrió un error al eliminar el usuario.");
    }
  };

  // Estado para abrir modal y consular un usuarios

  const [selectUserRead, setSelectUserRead] = useState(null);
  const [showModalRead, setShowModalRead] = useState(false);

  {
    /* Función para abrir el modal y consultar un usuario */
  }

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

  // Estado para abrir modal y modificar un usuario

  const [actualUserUpdate, setActualUserUpdate] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [messageUpdate, setMessageUpdate] = useState("");

  {
    /* Función para abrir el modal y modificar un usuario */
  }

  const updateUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/user/${id}`);
      const data = await res.json();
      setActualUserUpdate(data);
      setUpdatedUser(data);
      setShowModalUpdate(true);
      setMessageUpdate("");
    } catch (error) {
      console.error("Error al modificar los datos del usuario :", error);
      alert("No se pudo modificar los datos del usuario.");
    }
  };

  const updateUserInState = (updatedUser) => {
    setUsers((prevUser) =>
      prevUser.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  {
    /* Función para guardar la actualización en el backend */
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
        setMessageUpdate("✅ Usuario actualizado correctamente.");
        setMessageType("success");
        setShowModalUpdate(false);
      } else {
        setMessageUpdate(
          `❌ ${data.message || "Error al actualizar el usuario."}`
        );
        setMessageType("error");
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

  {
    /* Función para formatear las fechas */
  }

  const formatToLocalDate = (date) => {
    return new Intl.DateTimeFormat("es-CO").format(new Date(date));
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

        {/** Botón para crear un usuario */}

        <button type="button" className="mt-4" onClick={() => registerUser()}>
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
                <th scope="col">Acciones</th>
              </tr>
            </thead>

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
                        <i className="bi bi-three-dots-vertical"></i>
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
                            onClick={() => deleteUser(user)}
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
          <div className="modal show d-block modal-overlay">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title title-large">
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
                <div className="modal-body table-responsive">
                  <table className="table table-striped table-striped-columns border-primary table-hover  table-bordered align-middle">
                    <thead>
                      <tr>
                        <th scope="col">Dato</th>
                        <th scope="col">Valor Actual</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Nombre</th>
                        <td>
                          {selectUserRead.name + " " + selectUserRead.last_name}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Tipo de documento</th>
                        <td>{selectUserRead.id_type}</td>
                      </tr>
                      <tr>
                        <th scope="row">Documento de identidad</th>
                        <td>{selectUserRead.id_number}</td>
                      </tr>
                      <tr>
                        <th scope="row">Celular</th>
                        <td>{selectUserRead.phone}</td>
                      </tr>
                      <tr>
                        <th scope="row">Fecha de nacimiento</th>
                        <td>{formatToLocalDate(selectUserRead.birth_date)}</td>
                      </tr>
                      <tr>
                        <th scope="row">Correo</th>
                        <td>{selectUserRead.email}</td>
                      </tr>
                      <tr>
                        <th scope="row">Tipo de usuario</th>
                        <td>{selectUserRead.user_type}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal para modificar la información del usuario*/}

        {showModalUpdate && actualUserUpdate && (
          <div className="modal show d-block modal-overlay">
            <div className="modal-dialog modal-fullscreen-md-down">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title title-large">
                    Modificar el usuarios
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
                  <table className="table table-striped table-striped-columns border-primary table-hover  table-bordered align-middle">
                    <thead>
                      <tr>
                        <th scope="col">Dato</th>
                        <th scope="col">Valor actual</th>
                        <th scope="col">Nuevo valor</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      <tr>
                        <th scope="row">Nombres</th>
                        <td>{actualUserUpdate.name}</td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
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
                        <td>
                          {formatToLocalDate(actualUserUpdate.birth_date)}
                        </td>
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
                  <div className="modal-footer d-flex flex-column">
                    <div>
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

                    <div className="">
                      <AlertMessage
                        message={messageUpdate}
                        type={messageType}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal para eliminar usuario */}

        {showModalDelete && selectedUserDelete && (
          <div className="modal show d-block modal-overlay">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <span className="modal-title title-large">
                    Eliminar usuario
                  </span>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModalDelete(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>¿Está seguro de eliminar a {selectedUserDelete.name}?</p>
                </div>
                <div className="modal-footer d-flex flex-column">
                  <div>
                    <button
                      className="booking-form-btn"
                      onClick={() => setShowModalDelete(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="booking-form-btn"
                      onClick={() => saveDelete(selectedUserDelete)}
                    >
                      Eliminar
                    </button>
                  </div>

                  <div className="">
                    <AlertMessage message={messageDelete} type={messageType} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal para crear un usuario */}

        {showModalRegister && setUserRegister && (
          <div className="modal show d-block modal-overlay">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <span className="modal-title title-large">
                    Crear un usuario
                  </span>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModalRegister(false)}
                  ></button>
                </div>
                <div className="modal-body table-responsive">
                  <table className="table table-striped table-striped-columns border-primary table-hover table-bordered align-middle">
                    <thead>
                      <tr>
                        <th scope="col">Dato</th>
                        <th scope="col">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Nombres</th>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Apellidos</th>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Tipo de identificación</th>
                        <td>
                          <select
                            className="form-select"
                            required
                            value={id_type_id}
                            onChange={(e) => setIdTypeId(e.target.value)}
                          >
                            <option></option>
                            <option value={1}>Cédula de ciudadanía</option>
                            <option value={2}>Tarjeta de identidad</option>
                            <option value={3}>Pasaporte</option>
                            <option value={4}>Cédula de extranjería</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Número de identificación</th>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={id_number}
                            onChange={(e) => setIdNumber(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Celular</th>
                        <td>
                          <input
                            type="tel"
                            className="form-control"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Fecha de nacimiento</th>
                        <td>
                          <input
                            type="date"
                            className="form-control"
                            required
                            value={birth_date}
                            onChange={(e) => setBirthDate(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Tipo de usuario</th>
                        <td>
                          <select
                            className="form-select"
                            required
                            value={id_user_type}
                            onChange={(e) => setIdUserType(e.target.value)}
                          >
                            <option></option>
                            <option value={1}>Huésped</option>
                            <option value={2}>Administrativo</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Correo</th>
                        <td>
                          <input
                            type="email"
                            className="form-control"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Contraseña</th>
                        <td>
                          <div></div>
                          <input
                            type="password"
                            className="form-control"
                            required
                            pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer d-flex flex-column">
                  <div className="g-2">
                    <button onClick={() => setShowModalRegister(false)}>
                      Cancelar
                    </button>
                    <button onClick={() => saveRegister(userRegister)}>
                      Guardar
                    </button>
                  </div>
                  <div className="">
                    <AlertMessage
                      message={messageRegister}
                      type={messageType}
                    />
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
