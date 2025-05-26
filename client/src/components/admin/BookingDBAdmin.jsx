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
                    <td></td>
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
                          {/* PUT */}
                          <li>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() => updateBooking(bookings.id_booking)}
                            >
                              Modificar
                            </button>
                          </li>
                          {/* DELETE */}
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              onClick={() => deleteBooking(bookings.id_booking)}
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

        {/* Modal para actualizar los datos de las reservas */}

        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title title-large">
                  Modificar la reserva
                </h1>
                <button
                  className="btn-close"
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setShowModalUpdate(false);
                  }}
                ></button>
              </div>
              <div className="modal-body table-responsive">
                <table className="table table-striped-columns table-bordered align-middle">
                  <thead>
                    <tr>
                      <th scope="col">Dato</th>
                      <th scope="col">Dato actual</th>
                      <th scope="col">Nuevo dato</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    <tr>
                      <th scope="row">Usuario</th>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row">Ingreso</th>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row">Salida</th>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row">Habitación</th>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row">Total</th>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  className="booking-form-btn"
                  onClick={() => {
                    saveUpdate(updatedBooking);
                  }}
                >
                  Guardar
                </button>
                <button
                  className="booking-form-btn"
                  onClick={() => {
                    setShowModalUpdate(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
