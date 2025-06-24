import { useState, useEffect } from "react";
import Button from "../common/Button";
import AlertMessage from "../common/AlertMessage";
import ModalBookingDetail from "../common/ModalBookingDetail";

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
              <div className="col-auto d-flex flex-column justify-content-center">
                <span className="headline-small">Encuentra tu Reserva</span>
              </div>
              <button
                className="col d-flex flex-column justify-content-center close"
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
        <ModalBookingDetail
          booking={selectedBooking}
          onClose={() => setShowModalRead(false)}
        />
      )}
    </>
  );
};

export default ConsultarReserva;
