import { Link } from "react-router-dom";

export default function BookingForm() {
  return (
    <>
      {/*Contenedor principal que centra todo*/}
      <div className="d-flex justify-content-center">
        {/*Formulario de reserva*/}
        <div className="container w-auto d-flex flex-column align-items-center">
          {/*Título*/}
          <div className="row w-100">
            <span className="col text-start fw-bold mb-1 fs-6 label-medium p-0">
              Hacer una Reserva
            </span>
          </div>
          {/*Franja de botones*/}
          <div className="row">
            {/*Botón de check-in y check-out*/}
            <div className="col-auto">
              <Link
                to=""
                className="btn booking-form-btn px-2 py-0"
                role="button"
              >
                <div className="d-flex flex-row">
                  {/*Check-in*/}
                  <div className="d-flex flex-column me-3">
                    <div className="d-flex flex-row">
                      <div className="d-flex flex-column me-3 justify-content-center">
                        <i
                          className="bi bi-calendar"
                          style={{ fontSize: "1.5rem" }}
                        />
                      </div>
                      <div className="d-flex flex-column text-start">
                        <div className="row mb-0">
                          <span className="label-small">Check-in</span>
                        </div>
                        <div className="row mb-0">
                          <span className="body-small">Añadir fecha</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*Check-out*/}
                  <div className="d-flex flex-column border-start ps-3">
                    <div className="d-flex flex-row">
                      <div className="d-flex flex-column me-3 justify-content-center">
                        <i
                          className="bi bi-calendar"
                          style={{ fontSize: "1.5rem" }}
                        />
                      </div>
                      <div className="d-flex flex-column text-start">
                        <div className="row fw-bold">
                          <span className="label-small">Check-out</span>
                        </div>
                        <div className="row">
                          <span className="body-small">Añadir fecha</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            {/*Habitaciones*/}
            <div className="col-auto">
              <Link
                to=""
                className="btn booking-form-btn px-2 py-0"
                role="button"
              >
                <div className="d-flex flex-row">
                  <div className="d-flex flex-column me-3 justify-content-center">
                    <i
                      class="bi bi-file-person"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </div>
                  <div className="d-flex flex-column text-start">
                    <div className="row fw-bold">
                      <span className="label-small">Habitaciones</span>
                    </div>
                    <div className="row">
                      <span className="body-small">Cantidad</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            {/*Huespedes*/}
            <div className="col-auto">
              <Link
                to=""
                className="btn booking-form-btn px-2 py-0"
                role="button"
              >
                <div className="d-flex flex-row">
                  <div className="d-flex flex-column me-3 justify-content-center">
                    <i class="bi bi-people" style={{ fontSize: "1.5rem" }}></i>
                  </div>
                  <div className="d-flex flex-column text-start">
                    <div className="row fw-bold">
                      <span className="label-small">Huéspedes</span>
                    </div>
                    <div className="row">
                      <span className="body-small">Cantidad</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            {/*Llamado a la acción*/}
            <div className="col-auto">
              <button className="btn solid-btn h-100 label-small" type="submit">
                Reservar Ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
