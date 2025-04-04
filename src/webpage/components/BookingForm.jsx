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
            <span className="col text-start fw-bold mb-3 fs-6">
              Hacer una Reserva
            </span>
          </div>
          {/*Franja de botones*/}
          <div className="row">
            {/*Botón de check-in y check-out*/}
            <div className="col-auto">
              <Link to="" className="btn btn-light px-2 py-0" role="button">
                <div className="d-flex flex-row">
                  {/*Check-in*/}
                  <div className="d-flex flex-column me-3">
                    <div className="d-flex flex-row">
                      <div className="d-flex flex-column me-3 justify-content-center">
                        <i
                          className="bi bi-calendar"
                          style={{ fontSize: "2rem" }}
                        />
                      </div>
                      <div className="d-flex flex-column text-start">
                        <div className="row fw-bold">
                          <span>
                            <small>Check-in</small>
                          </span>
                        </div>
                        <div className="row">
                          <span>
                            <small>Añadir fecha</small>
                          </span>
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
                          style={{ fontSize: "2rem" }}
                        />
                      </div>
                      <div className="d-flex flex-column text-start">
                        <div className="row fw-bold">
                          <span>
                            <small>Check-out</small>
                          </span>
                        </div>
                        <div className="row">
                          <span>
                            <small>Añadir fecha</small>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            {/*Habitaciones*/}
            <div className="col-auto">
              <Link to="" className="btn btn-light px-2 py-0" role="button">
                <div className="d-flex flex-row">
                  <div className="d-flex flex-column me-3 justify-content-center">
                    <i
                      class="bi bi-file-person"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </div>
                  <div className="d-flex flex-column text-start">
                    <div className="row fw-bold">
                      <span>
                        <small>Habitaciones</small>
                      </span>
                    </div>
                    <div className="row">
                      <span>
                        <small>1</small>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            {/*Huespedes*/}
            <div className="col-auto">
              <Link to="" className="btn btn-light px-2 py-0" role="button">
                <div className="d-flex flex-row">
                  <div className="d-flex flex-column me-3 justify-content-center">
                    <i
                      class="bi bi-file-person-fill"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </div>
                  <div className="d-flex flex-column text-start">
                    <div className="row fw-bold">
                      <span>
                        <small>Huéspedes</small>
                      </span>
                    </div>
                    <div className="row">
                      <span>
                        <small>1</small>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            {/*Llamado a la acción*/}
            <div className="col-auto">
              <button className="btn btn-light h-100 fw-bold" type="submit">
                Reservar Ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
