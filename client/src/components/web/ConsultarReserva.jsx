import { useState } from "react";
import Button from "../common/Button";
import { Link } from "react-router-dom";

const ConsultarReserva = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <>
      <button
        className="btn navbar-btn body-medium"
        onClick={() => setMostrarModal(true)}
      >
        Buscar Reserva
      </button>

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
                No. de Confirmación
              </label>
              <input type="text" className="form-control" id="" required="" />
            </div>
            <div className="mt-4">
              <label htmlFor="" className="form-label label-medium">
                No. de Identificación
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
                  btnType="submit"
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsultarReserva;
