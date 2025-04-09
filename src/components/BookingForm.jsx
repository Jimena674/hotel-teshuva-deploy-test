import { Link } from "react-router-dom";
import Button from "./Button";

export default function BookingForm() {
  return (
    <>
      {/*Contenedor principal que centra todo*/}
      <div className="d-flex ">
        {/*Formulario de reserva*/}
        <div className="container d-flex flex-column ">
          {/*Título*/}
          <div className="flex-row w-100 mb-1">
            <span
              className="mb-1 headline-small p-0 "
              style={{ color: "#27174e" }}
            >
              Hacer una Reserva
            </span>
          </div>
          {/*Franja de botones*/}
          <div className="d-flex flex-column flex-md-row justify-content-center">
            {/*Botón de check-in y check-out*/}
            <div className="p-0 d-flex justify-content-center">
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
            <div className="d-flex justify-content-center p-0 mx-md-2 mt-2 mt-md-0">
              {/*Habitaciones*/}
              <div className="border flex-grow-1">
                <Link
                  to=""
                  className="btn booking-form-btn px-2 py-0 d-flex justify-content-center"
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
              <div className="flex-grow-1 border ms-2">
                <Link
                  to=""
                  className="btn booking-form-btn px-2 py-0 d-flex justify-content-center"
                  role="button"
                >
                  <div className="d-flex flex-row">
                    <div className="d-flex flex-column me-3 justify-content-center">
                      <i
                        class="bi bi-people"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
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
            </div>
            {/*Llamado a la acción*/}
            <div className="d-flex flex-column mt-md-0 mt-2">
              <Button
                name="Reservar Ahora"
                btnCustom="solid-btn-primary"
                btnText="label-small"
                paddingBtn=""
                marginBtn=""
                btnType="submit"
                btnSize="h-100"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
