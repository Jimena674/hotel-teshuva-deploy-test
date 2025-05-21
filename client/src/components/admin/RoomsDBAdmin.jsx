import { useEffect, useState } from "react";

export default function RoomsDBAdmin() {
  {
    /* Estado para traer las habitaciones de la base de datos */
  }

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

  {
    /* Estado para leer todos los datos de un usuario */
  }

  const [selectRoomRead, setSelectRoomRead] = useState(null);

  // Función para mostrar los datos de una habitación

  const readRoom = async () => {};

  {
    /* Estado para modificar los datos de una habitación */
  }

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [updatedRoom, setUpdatedRoom] = useState(null);
  const [actualRoomUpdate, setActualRoomUpdate] = useState(null);

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
      prevRooms.map((rooms) =>
        rooms.id_room === updatedRoom.id_room ? updatedRoom : rooms
      )
    );
  };

  {
    /* Enviar los datos de la actualización al backend */
  }

  const saveUpdate = async (rooms) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/room/${rooms.id_room}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(rooms),
        }
      );

      const data = await res.json();

      if (res.ok) {
        updateRoomInState(rooms);
        alert("Usuario actualizado correctamente");
        setShowModalUpdate(false);
      } else {
        alert("Error al actualizar el usuario.");
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

  return (
    <>
      <div className="container-fluid">
        <h1 className="title-large">Habitaciones</h1>
        <button type="button" className="mt-4">
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
                <th scope="col"></th>
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
        {/* Modal para actualizar los datos de las habitaciones */}
        {showModalUpdate && actualRoomUpdate && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title title-medium">
                    Modificar la información de la Habitación
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
                    <tbody className="table-group-divider">
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
                        <td>{actualRoomUpdate.floor}</td>
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
                    onClick={() => saveUpdate(updatedRoom)}
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
        )}
      </div>
    </>
  );
}
