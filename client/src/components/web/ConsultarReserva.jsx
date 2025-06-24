import { useState, useEffect } from "react";
import Button from "../common/Button";
import AlertMessage from "../common/AlertMessage";
import BookingStatusColor from "../common/BookingStatusColor";

const ConsultarReserva = () => {
  // Estado para el modal del formulario
  const [mostrarModal, setMostrarModal] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageReadBooking, setMessageReadBooking] = useState("");

  // Estado para el modal de la consulta
  const [code, setCode] = useState("");
  const [showModalRead, setShowModalRead] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  {
    /** Función para el modal de la consulta */
  }
  const readBooking = async (code) => {
    const url = `/api/booking/${code}`;
    console.log("🌐 Consultando:", url);
    if (!code) {
      setMessageType("error");
      setMessageReadBooking("❌ Se debe ingresar un código de reserva.");
      return;
    }
    try {
      const res = await fetch(url);
      console.log("🛑 res.ok:", res.ok, "status:", res.status);
      const data = await res.json();
      console.log("🔄 Respuesta del backend:", data);

      if (res.ok) {
        console.log("✅ Estado res.ok:", res.ok);
        setShowModalRead(true);
        setSelectedBooking(data);
      } else {
        setMessageType("error");
        setMessageReadBooking(`❌ ${data.message || "Reserva no encontrada."}`);
      }
    } catch (error) {
      setMessageType("error");
      setMessageReadBooking("❌ Error al consultar los datos de la reserva.");
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("🔍 Estado showModalRead cambió:", showModalRead);
  }, [showModalRead]);

  const formatToLocalDate = (dateStr) => {
    return new Intl.DateTimeFormat("es-CO").format(new Date(dateStr));
  };

  return (
    <>
      <button
        className="btn navbar-btn body-medium"
        onClick={() => {
          setMostrarModal(true);
          setCode("");
          setMessageReadBooking("");
        }}
      >
        Buscar Reserva
      </button>
      {/** Modal del formulario de consulta */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="reserva-modal">
            {/*Título*/}
            <div className="row mb-2">
              <div className="col d-flex flex-column justify-content-center">
                <span className="headline-small">Encuentra tu Reserva</span>
              </div>
              <button
                className="col-auto d-flex flex-column justify-content-center close"
                onClick={() => setMostrarModal(false)}
              >
                <i className="bi bi-x-square"></i>
              </button>
            </div>
            <hr />
            {/*Cuerpo*/}
            <div className="mt-4">
              <label className="form-label label-medium">Código</label>
              <input
                type="text"
                className="form-control"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            {/* Botón */}
            <div className="mt-4">
              <Button
                name="Buscar"
                btnCustom="solid-btn-tertiary"
                btnText="label-medium"
                btnSize="w-100"
                btnType="button"
                onClick={() => readBooking(code)}
              />
            </div>
            <div>
              <AlertMessage type={messageType} message={messageReadBooking} />
            </div>
          </div>
        </div>
      )}
      {/** Modal para mostrar la consulta. */}
      {showModalRead && selectedBooking && (
        <div className="modal show d-block modal-overlay">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <span className="modal-title headline-small">
                  Información de la reserva
                </span>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModalRead(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Código:</strong> {selectedBooking.code}
                </p>
                <p>
                  <strong>Estado:</strong>{" "}
                  <BookingStatusColor
                    type={selectedBooking.booking_status_name}
                  />
                </p>
                <p>
                  <strong>Nombre del usuario:</strong>{" "}
                  {selectedBooking.user_name +
                    " " +
                    selectedBooking.user_last_name}
                </p>
                <p>
                  <strong>Documento de identidad:</strong>{" "}
                  {selectedBooking.user_id_number}
                </p>
                <p>
                  <strong>Fecha de ingreso:</strong>{" "}
                  {formatToLocalDate(selectedBooking.check_in)}
                </p>
                <p>
                  <strong>Fecha de salida:</strong>
                  {" " + formatToLocalDate(selectedBooking.check_out)}
                </p>
                <p>
                  <strong>Habitación:</strong>
                  {" " + selectedBooking.room_number}
                </p>
                <p>
                  <strong>Tarifa:</strong>
                  {" " + "$ " + selectedBooking.room_rate}
                </p>
                <p>
                  <strong>Total:</strong>
                  {" " + "$ " + selectedBooking.total}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsultarReserva;
