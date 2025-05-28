import Button from "../Button";
import { DateRange } from "react-date-range";
//Importar los estilos y esqueleto para DateRange
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useState } from "react";

export default function BookingForm() {
  //Se declaran los estados y eventos necesarios
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <>
      {/*Contenedor principal que centra todo*/}
      <div className="d-flex ">
        {/*Formulario de reserva*/}
        <div className="container d-flex flex-column p-0">
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
          <div
            className="d-flex flex-column flex-md-row justify-content-center align-self-center"
            style={{ width: "fit-content" }}
          >
            {/*Botón de check-in y check-out*/}
            <div className="d-flex justify-content-center mt-2 mt-md-0 border">
              <div className="position-relative">
                <div
                  className="d-flex justify-content-center booking-form-btn input-group input-custom"
                  onClick={toggleCalendar}
                >
                  {/*Check-in*/}

                  <div className="d-flex flex-row me-3">
                    <div className="d-flex flex-column me-3 justify-content-center">
                      <i
                        className="bi bi-calendar"
                        style={{ fontSize: "1.5rem" }}
                      />
                    </div>
                    <div className="d-flex flex-column text-start">
                      <div className="row ">
                        <span className="label-small">Check-in</span>
                      </div>
                      <div className="row ">
                        <span className="body-small">
                          {range[0].startDate.toLocaleDateString()}
                        </span>
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
                          <span className="body-small">
                            {range[0].startDate.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {showCalendar && (
                  <div
                    className="position-absolute z-3"
                    style={{ top: "100%", left: 0 }}
                  >
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setRange([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={range}
                    />
                  </div>
                )}
              </div>
            </div>

            {/*Botón de Habitaciones y Huéspedes*/}
            <div className="d-flex justify-content-center mx-md-3 mt-2 mt-md-0">
              <div className="d-flex justify-content-center booking-form-btn input-group input-custom border">
                {/*Botón de Habitaciones*/}
                <div className="d-flex flex-row">
                  <div className="d-flex flex-column me-3 justify-content-center">
                    <i
                      className="bi bi-file-person"
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
              </div>

              {/*Botón de Huespedes*/}
              <div className="d-flex justify-content-center booking-form-btn input-group input-custom border ms-3">
                <div className="d-flex flex-row">
                  <div className="d-flex flex-column me-3 justify-content-center">
                    <i
                      className="bi bi-people"
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
              </div>
            </div>

            {/*Llamado a la acción*/}
            <div className="d-flex flex-column mt-md-0 mt-2">
              <Button
                name="Reservar Ahora"
                btnCustom="solid-btn-primary"
                btnText="label-small"
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
