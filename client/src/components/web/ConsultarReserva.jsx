import { useState } from "react";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import AlertMessage from "../common/AlertMessage";
import { bookingRoom } from "../../../../server/models/BookingModel";

const ConsultarReserva = () => {
  // Estado para el modal del formulario
  const [mostrarModal, setMostrarModal] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageReadBooking, setMessageReadBooking] = useState("");

  // Estado para el modal de la consulta
  const [showModalRead, setShowModalRead] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  {
    /** Función para el modal de la consulta */
  }
  const readBooking = async (code, id_user) => {
    if (!code || !id_user) {
      return res
        .status(404)
        .json({ message: "El código o el id del usuario no existe" });
    }
    try {
      const res = await fetch(`http://localhost:4000/api/booking/${code}`);
      const data = await res.json();
      setShowModalRead(true);
      setSelectedBooking(data);
    } catch (error) {
      setMessageType("error");
      setMessageReadBooking("Error al consultar los datos de la reserva.");
      console.error(error);
    }
  };

  return (
    <>
      <button
        className="btn navbar-btn body-medium"
        onClick={() => setMostrarModal(true)}
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
            <div className="">
              <span className="m-0 form-text body-medium">
                Todos los campos son requeridos.
              </span>
            </div>
            <div className="mt-4">
              <label htmlFor="" className="form-label label-medium">
                Código
              </label>
              <input type="text" className="form-control" id="" required="" />
            </div>
            <div className="mt-4">
              <label htmlFor="" className="form-label label-medium">
                No. de Identificació del usuario
              </label>
              <input type="text" className="form-control" id="" required="" />
            </div>
            {/* Botón */}
            <div className="mt-4">
              <Link>
                <Button
                  name="Buscar"
                  btnCustom="solid-btn-tertiary"
                  btnText="label-medium"
                  btnSize="w-100"
                  btnType="button"
                  onClick={() => readBooking(code)}
                />
              </Link>
            </div>
          </div>
        </div>
      )}
      {/** Modal para mostrar la consulta. */}
      {showModalRead && selectedBooking && (
        <div className="modal-overlay">
          <div className="reserva-modal">
            {/** Título modal */}
            <div className="row mb-2">
              <div className="col d-flex flex-column justify-content-center">
                <span className="headline-small">
                  Reserva {selectedBooking.code}
                </span>
                <button
                  className="col-auto d-flex flex-column justify-content-center close"
                  onClick={() => setShowModalRead(false)}
                >
                  <i className="bi bi-x-square"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsultarReserva;
