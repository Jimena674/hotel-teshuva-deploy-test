import { useState, useEffect } from "react";
import AlertMessage from "../../common/AlertMessage";
import { formatToLocalDate } from "../../../utils/FormatDateUtils";
import OfferStatusColor from "../../common/OfferStatusColor";

export default function ReadOffers() {
  //Estados para obtener las ofertas existentes
  const [readOffers, setReadOffers] = useState([]);
  const [messageType, setMessageType] = useState("");
  const [messageReadOffers, setMessageReadOffers] = useState("");
  const [loadingOffers, setLoadingOffers] = useState(true);

  /** función para obtener los datos de las ofertas */
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/offer/");
        const data = await res.json();
        setReadOffers(data);
      } catch (error) {
        console.error("Error al cargar los datos de las ofertas: ", error);
        setMessageType("error");
        setMessageReadOffers("❌ Error al cargar los datos de las ofertas.");
      } finally {
        setLoadingOffers(false);
      }
    };
    fetchOffers();
  }, []);

  return (
    <div>
      <h1 className="title-large">Ofertas</h1>
      <button type="button" className="mt-4">
        Crear Oferta
      </button>
      {/** Tabla de ofertas */}

      {loadingOffers ? (
        <p> Cargando las ofertas...</p>
      ) : (
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Imagen</th>
              <th scope="col">Nombre</th>
              <th scope="col">Descripción</th>
              <th scope="col">Fecha de inicio</th>
              <th scope="col">Fecha de finalización</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(readOffers) &&
              readOffers.map((offer, index) => (
                <tr key={offer.id_offer}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={offer.image_path}
                      alt="Imagen de la oferta"
                      width="80"
                      height="50"
                      style={{ objectFit: "cover" }}
                    />
                  </td>
                  <td>{offer.title}</td>
                  <td>{offer.description}</td>
                  <td>{formatToLocalDate(offer.start_date)}</td>
                  <td>{formatToLocalDate(offer.end_date)}</td>
                  <td>
                    <OfferStatusColor type={offer.is_active} />
                  </td>
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
                        {/** PUT */}
                        <li>
                          <button className="dropdown-item" type="button">
                            Modificar
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" type="button">
                            Eliminar
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
    </div>
  );
}
