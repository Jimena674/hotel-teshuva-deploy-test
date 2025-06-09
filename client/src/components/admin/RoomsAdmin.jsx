import { useEffect, useState } from "react";

export default function RoomsDBAdmin() {
  //Estado para traer las habitaciones de la base de datos

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/room/");
        const data = await res.json();
        console.log("Datos recibidos:", data);
        setRooms(data);
      } catch (error) {
        console.error("Error al cargar los datos de las habitaciones: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  // Estado para leer los datos de una habitación
  const [selectRoomRead, setSelectRoomRead] = useState(null);

  {
    /*Función para mostrar los datos de una habitación*/
  }

  const readRoom = async (id_room) => {
    try {
      // Recibir los datos del backend
      const res = await fetch(`http://localhost:4000/api/room/${id_room}`);
      // Parseo de los datos a json
      const data = await res.json();
      setSelectRoomRead(data);
    } catch (error) {
      console.error("Error al leer los datos de la habitación: ", error);
    }
  };

  // Estados para crear una habitación y abrir el modal
  const [showModalNewRoom, setShowModalNewRoom] = useState(false);
  const [registerRoom, setRegisterRoom] = useState([]);
  const [room_number, setRoomNumber] = useState("");
  const [rate, setRate] = useState("");
  const [id_room_type, setRoomType] = useState("");
  const [id_room_status, setRoomStatus] = useState("");
  const [id_floor, setFloor] = useState("");
  const [photo_path, setPhotoPath] = useState("");
  const [messageRegister, setMessageRegister] = useState("");
  const [messageType, setMessageType] = useState("");

  {
    /** Función para abrir el modal para crear una habitación */
  }
  const newRoom = async (room) => {
    setShowModalNewRoom(true);
    setRegisterRoom(room);
  };

  {
    /** Función para traer los datos de las habitaciones para actualizar la tabla */
  }
  const fetchRooms = async () => {
    const res = await fetch(`http://localhost:4000/api/room/`);
    const data = await res.json();
    setRooms(data);
  };

  {
    /** Función para guardar la habitación en la base de datos */
  }
  const saveRoom = async () => {
    try {
      //Enviar datos y solicitar respuesta del backend
      const res = await fetch(`http://localhost:4000/api/room/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_number,
          rate,
          id_room_type,
          id_room_status,
          id_floor,
          photo_path,
        }),
      });
      // Parsear la respuesta a JSON
      const data = await res.json();
      if (res.ok) {
        setRoomNumber("");
        setRate("");
        setRoomType("");
        setRoomStatus("");
        setFloor("");
        setPhotoPath("");
        setMessageRegister("✅ Registro exitoso.");
        setMessageType("success");
        // Actualizar la tabla
        await fetchRooms();
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

  {
    /* Estados para modificar los datos de una habitación */
  }

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [updatedRoom, setUpdatedRoom] = useState(null);
  const [actualRoomUpdate, setActualRoomUpdate] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Función para abrir el modal para modificar una habitación

  const updateRoom = async (id_room) => {
    try {
      const res = await fetch(`http://localhost:4000/api/room/${id_room}`);
      const data = await res.json();
      setActualRoomUpdate(data);
      setUpdatedRoom(data);
      setShowModalUpdate(true);
    } catch (error) {
      console.error("Error al actualizar los datos de la habitación: ", error);
      alert("No se pudo actualizar los datos de la habitación.");
    }
  };

  //Actualizar la información en la tabla

  const updateRoomInState = (updatedRoom) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id_room === updatedRoom.id_room ? updatedRoom : room
      )
    );
  };

  {
    /* Enviar los datos de la actualización al backend */
  }

  const saveUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("room_number", updatedRoom.room_number);
      formData.append("rate", updatedRoom.rate);
      formData.append("id_room_type", updatedRoom.id_room_type);
      formData.append("id_room_status", updatedRoom.id_room_status);
      formData.append("id_floor", updatedRoom.id_floor);

      if (updatedRoom.newPhoto) {
        formData.append("photo_path", updatedRoom.newPhoto);
      }

      const res = await fetch(
        `http://localhost:4000/api/room/${updatedRoom.id_room}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        updateRoomInState(updatedRoom);
        alert("Habitación actualizada correctamente.");
        setShowModalUpdate(false);
        setPhotoPreview(null);
      } else {
        alert("Error al actualizar la habitación.");
      }
    } catch (error) {
      console.error(
        "Error al guardar en el backend la actualización de la habitación."
      );
    }
  };

  const idRoomType = [
    { id: 1, name: "Individual" },
    { id: 2, name: "Doble" },
  ];

  const idRoomStatus = [
    { id: 1, name: "Ocupada" },
    { id: 2, name: "Vacante limpia" },
    { id: 3, name: "Vacante sucia" },
    { id: 4, name: "Fuera de servicio" },
  ];
  const idFloor = [
    { id: 1, name: "Piso 1" },
    { id: 2, name: "Piso 2" },
  ];

  {
    /* Función para eliminar una habitación */
  }

  const deleteRoom = async (room_number) => {
    try {
      // Llamar a la función del backend
      const res = await fetch(`http://localhost:4000/api/room/${room_number}`, {
        method: "DELETE",
      });

      // Parsear la respuesta
      const data = await res.json();

      if (res.ok) {
        alert("Habitación eliminada con éxito.");
        // Actualizar la tabla de habitaciones

        setRooms((prev) =>
          prev.filter((room) => room.room_number !== room_number)
        );
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al eliminar la habitación: ", error);
      alert("Ocurrió un error al eliminar la habitación.");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <h1 className="title-large">Habitaciones</h1>
        <button type="button" className="mt-4" onClick={() => newRoom()}>
          Crear habitación
        </button>

        {/* Tabla de habitaciones */}

        {loading ? (
          <p> Cargando habitaciones ...</p>
        ) : (
          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Foto</th>
                <th scope="col">Número</th>
                <th scope="col">Tarifa</th>

                <th scope="col">
                  <select id="type-select" className="form-select">
                    <option value="todos">Tipo de habitación</option>
                    <option value="todos">Todos</option>
                    <option value="individual"> Habitación individual</option>
                    <option value="doble"> Habitación doble</option>
                  </select>
                </th>
                <th scope="col">
                  <select id="floor-select" className="form-select">
                    <option value="todos">Piso</option>
                    <option value="todos">Todos</option>
                    <option value="uno">Piso 1</option>
                    <option value="dos">Piso 2</option>
                  </select>
                </th>
                <th scope="col">
                  <select id="status-select" className="form-select">
                    <option value="todos">Estado</option>
                    <option value="todos">Todos</option>
                    <option value="occupied">Ocupada</option>
                    <option value="vacant-clean">Disponible limpia</option>
                    <option value="vacant-dirty">Disponible sucia</option>
                    <option value="out-of-order">Fuera de servicio</option>
                  </select>
                </th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(rooms) &&
                rooms.map((room, index) => (
                  <tr key={room.id_room}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={room.photo_path} alt="Foto" width="80" />
                    </td>
                    <td>{room.room_number}</td>
                    <td>{room.rate}</td>
                    <td>{room.room_type}</td>
                    <td>{room.floor}</td>
                    <td>{room.room_status}</td>

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
                        <ul className="dropdown-menu">
                          {/* PUT */}
                          <li>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() => updateRoom(room.id_room)}
                            >
                              Modificar
                            </button>
                          </li>
                          {/* DELETE */}
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              onClick={() => deleteRoom(room.room_number)}
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
        {/** Modal para crear una habitación */}
        {showModalNewRoom && setRegisterRoom && (
          <div className="modal show d-block modal-overlay">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <span className="modal-title title-large">
                    Crear una habitación
                  </span>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModalNewRoom(false)}
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
                  </table>
                </div>
                <div className="modal-footer"></div>
              </div>
            </div>
          </div>
        )}

        {/* Modal para actualizar los datos de las habitaciones */}
        {showModalUpdate && actualRoomUpdate && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title title-large">
                    Modificar la información de la Habitación
                  </h1>
                  <button
                    className="btn-close"
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setShowModalUpdate(false);
                      setPhotoPreview(null);
                    }}
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
                    <tbody className="table-group-divider">
                      <tr>
                        <th scope="row">Foto</th>
                        <td>
                          <img
                            src={
                              photoPreview
                                ? URL.createObjectURL(photoPreview)
                                : actualRoomUpdate.photo_path
                            }
                            alt="Foto actual"
                            width="80"
                          />
                        </td>
                        <td>
                          <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                setPhotoPreview(file);
                                setUpdatedRoom({
                                  ...updatedRoom,
                                  newPhoto: file,
                                });
                              }
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Número</th>
                        <td>{actualRoomUpdate.room_number}</td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={updatedRoom.room_number}
                            onChange={(e) =>
                              setUpdatedRoom({
                                ...updatedRoom,
                                room_number: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Tarifa</th>
                        <td>{actualRoomUpdate.rate}</td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={updatedRoom.rate}
                            onChange={(e) =>
                              setUpdatedRoom({
                                ...updatedRoom,
                                rate: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Tipo de habitación</th>
                        <td>{actualRoomUpdate.room_type}</td>
                        <td>
                          <label htmlFor="idRoomType">Tipo de habitación</label>
                          <select
                            id="idRoomType"
                            className="form-select"
                            value={updatedRoom.id_room_type}
                            onChange={(e) =>
                              setUpdatedRoom({
                                ...updatedRoom,
                                id_room_type: parseInt(e.target.value),
                              })
                            }
                          >
                            {idRoomType.map((type) => (
                              <option key={type.id} value={type.id}>
                                {type.name}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Piso</th>
                        <td>{actualRoomUpdate.floor}</td>
                        <td>
                          <label htmlFor="idFloor">Piso</label>
                          <select
                            id="idFloor"
                            className="form-select"
                            value={updatedRoom.id_floor}
                            onChange={(e) =>
                              setUpdatedRoom({
                                ...updatedRoom,
                                id_floor: parseInt(e.target.value),
                              })
                            }
                          >
                            {idFloor.map((type) => (
                              <option key={type.id} value={type.id}>
                                {type.name}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Estado</th>
                        <td>{actualRoomUpdate.room_status}</td>
                        <td>
                          <label htmlFor="idRoomStatus">Estado</label>
                          <select
                            id="idRoomStatus"
                            className="form-select"
                            value={updatedRoom.id_room_status}
                            onChange={(e) =>
                              setUpdatedRoom({
                                ...updatedRoom,
                                id_room_status: parseInt(e.target.value),
                              })
                            }
                          >
                            {idRoomStatus.map((type) => (
                              <option key={type.id} value={type.id}>
                                {type.name}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button
                    className="booking-form-btn"
                    onClick={() => {
                      saveUpdate(updatedRoom);
                    }}
                  >
                    Guardar
                  </button>
                  <button
                    className="booking-form-btn"
                    onClick={() => {
                      setShowModalUpdate(false);
                      setPhotoPreview(null);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
