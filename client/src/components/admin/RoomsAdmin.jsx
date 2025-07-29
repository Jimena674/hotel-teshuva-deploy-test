import { useEffect, useState } from "react";
import AlertMessage from "../common/AlertMessage";

export default function RoomsAdmin() {
  //Estado para traer las habitaciones de la base de datos
  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);

  {
    /** Función para obtener los datos de las habitaciones */
  }
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
        setLoadingRooms(false);
      }
    };
    fetchRooms();
  }, []);

  // Estado para obtener los datos de los servicios de las habitaciones
  const [facilities, setFacilities] = useState([]);

  {
    /** Función para obtener los datos de los servicios de las habitaciones */
  }
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/facility/");
        const data = await res.json();
        console.log("Los servicios de las habitaciones son: ", data);
        setFacilities(data);
      } catch (error) {
        console.error("Error al cargar los datos de los servicios: ", error);
      }
    };
    fetchFacilities();
  }, []);

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

  // Estados para consultar una habitación.
  const [showModalReadRoom, setShowModalReadRoom] = useState(false);
  const [messageReadRoom, setMessageReadRoom] = useState("");
  const [readedRoom, setReadedRoom] = useState(null);

  {
    /** Función para consultar los datos de una habitación. */
  }

  const readRoom = async (id_room) => {
    try {
      // Recibir los datos del backend
      const res = await fetch(`http://localhost:4000/api/room/${id_room}`);
      // Parseo de los datos a json
      const data = await res.json();
      setReadedRoom(data);
      console.log("Los datos de la habitación son: ");
      console.log(data);
      setShowModalReadRoom(true);
    } catch (error) {
      setMessageReadRoom("❌ Error de conexión con el servidor.");
      setMessageType("error");
      console.error("Error al leer los datos de la habitación: ", error);
    }
  };

  //Estados para abrir el modal y modificar los datos de una habitación
  const [showModalUpdateRoom, setShowModalUpdateRoom] = useState(false);
  const [updatedRoom, setUpdatedRoom] = useState(null);
  const [actualRoomUpdate, setActualRoomUpdate] = useState(null);
  const [photoPreviewRoom, setPhotoPreviewRoom] = useState(null);
  const [messageUpdateRoom, setMessageUpdateRoom] = useState("");

  {
    /*Función para abrir el modal para modificar una habitación*/
  }

  const idFacilities = [
    { id: 1, name: "Conexión Wi-Fi" },
    { id: 2, name: "TV" },
    { id: 3, name: "Aire acondicionado" },
    { id: 4, name: "Articulos de aseo" },
    { id: 5, name: "Secador de pelo" },
    { id: 6, name: "Minibar" },
    { id: 7, name: "Teléfono" },
    { id: 8, name: "Servicio a la habitación" },
    { id: 9, name: "Caja fuerte" },
    { id: 10, name: "Ventana con vista" },
    { id: 11, name: "Mesa y silla" },
  ];

  const updateRoom = async (id_room) => {
    try {
      const res = await fetch(`http://localhost:4000/api/room/${id_room}`);
      const data = await res.json();
      setActualRoomUpdate(data);
      setUpdatedRoom({
        // Se asignan valores por defecto como estado inicial
        // Operador ?? nullish coalescing asigna el valor de la derecha solo si el de la izquierda es null
        id_room: data.id_room,
        room_number: data.room_number ?? "",
        rate: data.rate ?? 0,
        id_room_type: data.id_room_type ?? 1,
        id_room_status: data.id_room_status ?? 1,
        id_floor: data.id_floor ?? 1,
        photo_path: data.photo_path ?? "",
        room_description: data.room_description ?? "",
        facilities: data.facilities
          .map((name) => {
            const found = idFacilities.find((f) => f.name === name);
            return found ? found.id : null;
          })
          .filter((id) => id !== null),
      });
      console.log("Facilities recibidas: ", data.facilities);
      setShowModalUpdateRoom(true);
      setMessageUpdateRoom("");
      console.log("Los valores actuales de la habitación son: ");
      console.log(data);
    } catch (error) {
      console.error("Error al actualizar los datos de la habitación: ", error);
      alert("No se pudo actualizar los datos de la habitación.");
    }
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
      formData.append("room_description", updatedRoom.room_description);
      formData.append("facilities", JSON.stringify(updatedRoom.facilities)); // Convertir el array recibido en un string JSON válido para el backend

      // newPhoto coincide con RoomRoutes y multerConfig
      if (updatedRoom.newPhoto) {
        formData.append("newPhoto", updatedRoom.newPhoto);
      }

      const res = await fetch(
        `http://localhost:4000/api/room/${updatedRoom.id_room}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log("Los nuevos valores de la habitación son: ");
        console.log(data);
        await fetchRooms();
        setMessageUpdateRoom("✅ Habitación actualizada con éxito.");
        setMessageType("success");
        setPhotoPreviewRoom(null);
      } else {
        setMessageUpdateRoom(
          `❌ ${data.message || "Error al actualizar la habitación."} `
        );
        setMessageType("error");
      }
    } catch (error) {
      setMessageUpdateRoom("❌ Error de conexión con el servidor.");
      setMessageType("error");
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

  // Estados para eliminar una habitación
  const [showModalDeleteRoom, setShowModalDeteleRoom] = useState(false);
  const [messageDeleteRoom, setMessageDeleteRoom] = useState("");
  const [selectedRoomDelete, setSelectedRoomDelete] = useState(null);

  {
    /* Función para abrir el modal de eliminar habitación */
  }

  const deleteRoom = async (room) => {
    setShowModalDeteleRoom(true);
    setSelectedRoomDelete(room);
    setMessageDeleteRoom("");
  };

  {
    /* Función para guardar los cambios en el backend */
  }

  const saveDeleteRoom = async (room) => {
    try {
      // Llamar a la función del backend
      const res = await fetch(
        `http://localhost:4000/api/room/${room.room_number}`,
        {
          method: "DELETE",
        }
      );

      // Parsear la respuesta
      const data = await res.json();

      if (res.ok) {
        setMessageDeleteRoom("✅ Habitación eliminada con éxito.");
        setMessageType("success");
        // Actualizar la tabla de habitaciones
        await fetchRooms();
      } else {
        setMessageDeleteRoom(
          `❌ ${data.message || "Error al eliminar la habitación."}`
        );
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error al eliminar la habitación: ", error);
      setMessageDeleteRoom("❌ Error de conexión con el servidor.");
      setMessageType("error");
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

        {loadingRooms ? (
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
                      <img
                        src={room.photo_path}
                        alt="Foto de la habitación"
                        width="80"
                      />
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
                          {/* GET */}
                          <li>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() => readRoom(room.id_room)}
                            >
                              Consultar
                            </button>
                          </li>
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
                              onClick={() => deleteRoom(room)}
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
                    <tbody>
                      <tr>
                        <th scope="row">Número de habitación</th>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={room_number}
                            onChange={(e) => setRoomNumber(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Tarifa</th>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            required
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Tipo de habitación</th>
                        <td>
                          <select
                            className="form-select"
                            required
                            value={id_room_type}
                            onChange={(e) => setRoomType(e.target.value)}
                          >
                            <option></option>
                            <option value={1}>Individual</option>
                            <option value={2}>Doble</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Estado</th>
                        <td>
                          <select
                            className="form-select"
                            required
                            value={id_room_status}
                            onChange={(e) => setRoomStatus(e.target.value)}
                          >
                            <option></option>
                            <option value={1}>Ocupada</option>
                            <option value={2}>Vacante limpia</option>
                            <option value={3}>Vacante sucia</option>
                            <option value={4}>Fuera de servicio</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Piso</th>
                        <td>
                          <select
                            className="form-select"
                            required
                            value={id_floor}
                            onChange={(e) => setFloor(e.target.value)}
                          >
                            <option></option>
                            <option value={1}>Piso 1</option>
                            <option value={2}>Piso 2</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th>Foto</th>
                        <td>
                          <input
                            type="file"
                            accept="image/"
                            onChange={(e) => setPhotoPath}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer d-flex flex-column">
                  <div className="row gx-3">
                    <div className="col">
                      <button
                        className="booking-form-btn"
                        onClick={() => setShowModalNewRoom(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                    <div className="col">
                      <button
                        className="solid-btn-tertiary"
                        onClick={() => saveRoom(registerRoom)}
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                  <div>
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

        {/* Modal para actualizar los datos de las habitaciones */}
        {showModalUpdateRoom && actualRoomUpdate && (
          <div className="modal show d-block modal-overlay">
            <div className="modal-dialog modal-lg">
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
                      setShowModalUpdateRoom(false);
                      setPhotoPreviewRoom(null);
                    }}
                  ></button>
                </div>
                <div className="modal-body table-responsive">
                  <table className="table table-striped-columns table-bordered align-middle">
                    <thead className="table-light">
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
                              photoPreviewRoom
                                ? URL.createObjectURL(photoPreviewRoom)
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
                                setPhotoPreviewRoom(file);
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
                            name="id_room_type"
                            className="form-select"
                            value={updatedRoom.id_room_type}
                            onChange={(e) =>
                              setUpdatedRoom({
                                ...updatedRoom,
                                id_room_type: parseInt(e.target.value),
                              })
                            }
                          >
                            {idRoomType.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.name}
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
                            name="id_floor"
                            className="form-select"
                            value={updatedRoom.id_floor}
                            onChange={(e) =>
                              setUpdatedRoom({
                                ...updatedRoom,
                                id_floor: parseInt(e.target.value),
                              })
                            }
                          >
                            {idFloor.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.name}
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
                            {idRoomStatus.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Descripción</th>
                        <td>{actualRoomUpdate.room_description}</td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={updatedRoom.room_description}
                            onChange={(e) =>
                              setUpdatedRoom({
                                ...updatedRoom,
                                room_description: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Servicios</th>
                        <td colSpan="2">
                          <table className="table">
                            <thead className="table-light">
                              <tr>
                                <th scope="col">Valor actual</th>
                                <th scope="col">Nuevo valor</th>
                              </tr>
                            </thead>
                            <tbody>
                              {updatedRoom &&
                                idFacilities.map((facility) => (
                                  <tr key={facility.id}>
                                    <td>{facility.name}</td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        value={facility.id}
                                        checked={updatedRoom.facilities.includes(
                                          facility.id
                                        )}
                                        onChange={(e) => {
                                          const value = parseInt(
                                            e.target.value
                                          );
                                          const isChecked = e.target.checked;
                                          setUpdatedRoom((prev) => ({
                                            ...prev,
                                            facilities: isChecked
                                              ? [...prev.facilities, value]
                                              : prev.facilities.filter(
                                                  (id) => id !== value
                                                ),
                                          }));
                                        }}
                                      />
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer d-flex flex-column">
                  <div className="row gx-3">
                    <div className="col">
                      <button
                        className="booking-form-btn"
                        onClick={() => {
                          setShowModalUpdateRoom(false);
                          setPhotoPreviewRoom(null);
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                    <div className="col">
                      {" "}
                      <button
                        className="solid-btn-tertiary"
                        onClick={() => {
                          saveUpdate(updatedRoom);
                        }}
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <AlertMessage
                      message={messageUpdateRoom}
                      type={messageType}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/** Modal para consultar los datos de una habitación. */}

        {showModalReadRoom && readedRoom && (
          <div className="modal show d-block modal-overlay">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <span className="modal-title title-large">
                    Consultar habitación
                  </span>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModalReadRoom(false)}
                  ></button>
                </div>
                <div className="modal-body table-responsive">
                  <table className="table table-striped table-striped-columns border-primary table-hover table-bordered align-middle">
                    <thead>
                      <tr>
                        <th scope="col">Dato</th>
                        <th scope="col">Valor actual</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Foto</th>
                        <td>
                          <img
                            src={
                              photoPreviewRoom
                                ? URL.createObjectURL(photoPreviewRoom)
                                : readedRoom.photo_path
                            }
                            alt="Foto actual"
                            width="80"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Número de habitación</th>
                        <td>{readedRoom.room_number}</td>
                      </tr>
                      <tr>
                        <th scope="row">Tarifa</th>
                        <td>{readedRoom.rate}</td>
                      </tr>
                      <tr>
                        <th scope="row">Tipo de habitación</th>
                        <td>{readedRoom.room_type}</td>
                      </tr>
                      <tr>
                        <th scope="row">Piso</th>
                        <td>{readedRoom.floor}</td>
                      </tr>
                      <tr>
                        <th scope="row">Estado</th>
                        <td>{readedRoom.room_status}</td>
                      </tr>
                      <tr>
                        <th scope="row">Servicios</th>
                        <td>
                          {readedRoom.facilities?.map((facility, index) => (
                            <>
                              <li key={index}>{facility}</li>
                              {/** 
                              <span key={index}>
                                {facility}{" "}
                                {index < readedRoom.facilities.length - 1
                                  ? ", "
                                  : "."}
                              </span>
                              */}
                            </>
                          ))}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Descripción</th>
                        <td>{readedRoom.room_description}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/** Modal para eliminar una habitación. */}

        {showModalDeleteRoom && selectedRoomDelete && (
          <div className="modal show d-block modal-overlay">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <span className="modal-title title-large">
                    Eliminar habitación
                  </span>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModalDeteleRoom(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <span>
                    ¿Está seguro de eliminar la habitación{" "}
                    <b>{selectedRoomDelete.room_number}</b>?
                  </span>
                </div>
                <div className="modal-footer d-flex flex-column">
                  <div className="row gx-3">
                    <div className="col">
                      <button
                        type="button"
                        className="booking-form-btn"
                        onClick={() => setShowModalDeteleRoom(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                    <div className="col">
                      <button
                        type="button"
                        className="solid-btn-tertiary"
                        onClick={() => saveDeleteRoom(selectedRoomDelete)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <AlertMessage
                      message={messageDeleteRoom}
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
