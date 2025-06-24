import BookingStatusColor from "./BookingStatusColor";

export default function ModalBookingDetail({ booking, onClose }) {
  const formatToLocalDate = (dateStr) => {
    return new Intl.DateTimeFormat("es-CO").format(new Date(dateStr));
  };
  return (
    <div className="modal show d-block modal-overlay">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content reserva-modal">
          <div className="modal-header row mb-2">
            <div className="col d-flex flex-column justify-content-center">
              <span className="modal-title title-large">
                {" "}
                Información de la Reserva
              </span>
            </div>
            <button
              type="button"
              className="col-auto d-flex flex-column justify-content-center close"
              onClick={onClose}
            >
              <i className="bi bi-x-square"></i>
            </button>
          </div>
          <div className="modal-body table-responsive">
            <table className="table align-middle">
              <tbody>
                <tr>
                  <th scope="row">Código:</th>
                  <td>{booking.code}</td>
                </tr>
                <tr>
                  <th scope="row">Estado:</th>
                  <td>
                    <BookingStatusColor type={booking.booking_status_name} />
                  </td>
                </tr>
                <tr>
                  <th scope="row">Nombre del usuario:</th>
                  <td>{booking.user_name + " " + booking.user_last_name}</td>
                </tr>
                <tr>
                  <th scope="row">Documento de identidad:</th>
                  <td>{booking.user_id_number}</td>
                </tr>
                <tr>
                  <th scope="row">Fecha de ingreso:</th>
                  <td>{formatToLocalDate(booking.check_in)}</td>
                </tr>
                <tr>
                  <th scope="row">Fecha de salida:</th>
                  <td>{formatToLocalDate(booking.check_out)}</td>
                </tr>
                <tr>
                  <th scope="row">Habitación:</th>
                  <td>{booking.room_number}</td>
                </tr>
                <tr>
                  <th scope="row">Tarifa:</th>
                  <td>{booking.room_rate}</td>
                </tr>
                <tr>
                  <th scope="row">Total:</th>
                  <td>{booking.total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
