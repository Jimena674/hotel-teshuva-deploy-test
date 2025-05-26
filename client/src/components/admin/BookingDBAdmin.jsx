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

  // Estado para abrir el modal y consultar los datos de una reserva

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModalRead, setShowModalRead] = useState(false);

  {
    /* Función para abrir el modal */
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
                    <td>{booking.id_user}</td>
                    <td>{booking.check_in}</td>
                    <td>{booking.check_out}</td>

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
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        {/* Modal para consultar los datos de una reserva */}
        {showModalRead && selectedBooking && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <span className="modal-title">Información de la reserva</span>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModalRead(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <table>
                    <thead></thead>
                    <tbody></tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button className="" onClick={() => setShowModalRead(false)}>
                    {" "}
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
