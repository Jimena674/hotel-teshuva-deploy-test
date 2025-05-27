import { useEffect, useState } from "react";

export default function BookingDBAdmin() {
  // Estado para obtener todas las reservas
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  {
    /* Función para obtener y mostrar los datos de las reservas */
  }

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/booking/`);
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Error al leer los datos de las reservas: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTotal();
  }, []);

  // Estado para abrir el modal y consultar una reserva

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModalRead, setShowModalRead] = useState(false);

  {
    /* Función para abrir el modal de consulta */
  }

  const readBooking = async (code) => {
    try {
      const res = await fetch(`http://localhost:4000/api/booking/${code}`);
      const data = await res.json();
      setSelectedBooking(data);
      setShowModalRead(true);
    } catch (error) {
      console.error("Error al consultar los datos del usuario.");
      alert("Error al consultar los datos de la reserva");
    }
  };

  // Estado para abrir el modal y modificar una reserva

  const [actualBooking, setActualBooking] = useState(null);
  const [updatedBooking, setUpdatedBooking] = useState(null);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  {
    /* Función para abrir el modal de modificar */
  }

  const updateBooking = async (code) => {
    try {
      const res = await fetch(`http://localhost:4000/api/booking/${code}`);
      const data = await res.json();
      setActualBooking(data);
      setShowModalUpdate(true);
      setUpdatedBooking(data);
    } catch (error) {
      console.error("Error al modificar la reserva: ", error);
      alert("Error al modificar la reserva.");
    }
  };

  {
    /* Función para actualizar los datos en la tabla */
  }

  const updateBookingInTable = (updatedBooking) => {
    setBookings((prevBooking) =>
      prevBooking.map((booking) =>
        booking.code === updatedBooking.code ? updatedBooking : booking
      )
    );
  };

  {
    /* Función para guardar los cambios */
  }

  const saveUpdate = async (booking) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/booking/${booking.code}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(booking),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("Reserva actualizada.");
        setShowModalUpdate(false);
        updateBookingInTable(booking);
      } else {
        alert("Error al guardar los cambios: " + data.message);
      }
    } catch (error) {
      console.error("Error al guardar los cambios: ", error);
    }
  };

  {
    /* Función para hacer compatible los formatos de fecha */
  }

  const formatDateForInput = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    return localDate.toISOString().split("T")[0]; // Solo yyyy-MM-dd
  };

  return (
    <>
      <div className="container-fluid">
        <h1 className="title-large">Reservas</h1>
        <button type="button" className="mt-4">
          Crear reserva
        </button>
        {/* Tabla de reservas */}
        {loading ? (
          <p>Cargando reservas...</p>
        ) : (
          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Código</th>
                <th scope="col">Usuario</th>
                <th scope="col">Ingreso</th>
                <th scope="col">Salida</th>
                <th scope="col">Habitación</th>
                <th scope="col">Total</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(bookings) &&
                bookings.map((booking, index) => (
                  <tr key={booking.id_booking}>
                    <td>{index + 1}</td>
                    <td>{booking.code}</td>
                    <td>{booking.user_name}</td>
                    <td>{booking.check_in}</td>
                    <td>{booking.check_out}</td>
                    <td>{booking.room}</td>
                    <td>{booking.total}</td>
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
                              onClick={() => readBooking(booking.code)}
                            >
                              Consultar
                            </button>
                          </li>
                          {/* PUT */}
                          <li>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() => updateBooking(booking.code)}
                            >
                              Modificar
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
        {/* Modal para consultar una reserva */}
        {showModalRead && selectedBooking && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <span className="modal-title title-large">
                    Información de la reserva
                  </span>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModalRead(false)}
                  ></button>
                </div>
                <div className="modal-body table-responsive">
                  <table className="table table-striped-columns table-bordered align-middle">
                    <thead>
                      <tr>
                        <th scope="col">Dato</th>
                        <th scope="col">Dato Actual</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Código</th>
                        <td>{selectedBooking.code}</td>
                      </tr>
                      <tr>
                        <th scope="row">Usuario</th>
                        <td>{selectedBooking.user_name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Ingreso</th>
                        <td>{selectedBooking.check_in}</td>
                      </tr>
                      <tr>
                        <th scope="row">Salida</th>
                        <td>{selectedBooking.check_out}</td>
                      </tr>
                      <tr>
                        <th scope="row">Habitación</th>
                        <td>{selectedBooking.room}</td>
                      </tr>
                      <tr>
                        <th scope="row">Total</th>
                        <td>{selectedBooking.total}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button className="" onClick={() => setShowModalRead(false)}>
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Modal para modificar una reserva */}
        {showModalUpdate && actualBooking && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <span className="modal-title title-large">
                    Modificar reserva
                  </span>
                  <button
                    type="button"
                    className="btn-close"
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
                    <tbody>
                      <tr>
                        <th scope="row">Código</th>
                        <td>{actualBooking.code}</td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={updatedBooking.code}
                            onChange={(e) =>
                              setUpdatedBooking({
                                ...updatedBooking,
                                code: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Usuario</th>
                        <td>{actualBooking.user_name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Ingreso</th>
                        <td>{actualBooking.check_in}</td>
                        <td>
                          <input
                            type="date"
                            className="form-control"
                            value={formatDateForInput(updatedBooking.check_in)}
                            onChange={(e) =>
                              setUpdatedBooking({
                                ...updatedBooking,
                                check_in: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Salida</th>
                        <td>{actualBooking.check_out}</td>
                        <td>
                          <input
                            type="date"
                            className="form-control"
                            value={formatDateForInput(updatedBooking.check_out)}
                            onChange={(e) =>
                              setUpdatedBooking({
                                ...updatedBooking,
                                check_out: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Habitación</th>
                        <td>{actualBooking.room}</td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={updatedBooking.room}
                            onChange={(e) =>
                              setUpdatedBooking({
                                ...updatedBooking,
                                room: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Total</th>
                        <td>{actualBooking.total}</td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            value={updatedBooking.total}
                            onChange={(e) =>
                              setUpdatedBooking({
                                ...updatedBooking,
                                total: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button
                    className="booking-form-btn"
                    onClick={() => saveUpdate(updatedBooking)}
                  >
                    Guardar
                  </button>
                  <button
                    className="booking-form-btn"
                    onClick={() => setShowModalUpdate(false)}
                  >
                    Cerrar
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
