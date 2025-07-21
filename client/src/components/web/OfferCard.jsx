import { useState } from "react";
import Button from "../common/Button";
import { Link } from "react-router-dom";

export default function OfferCard({ offer }) {
  // Estados para consultar la habitación
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Función para leer una habitación
  const readOffer = async () => {
    try {
      // Consulta a BD
      const res = await fetch(`/api/offer/${id_offer}`);
      // Parsear la respuesta a JSON
      const data = await res.json();
      console.log("🔄 Respuesta del backend:", data);

      if (res.ok) {
        setSelectedOffer(data);
      }
    } catch (error) {
      console.error("Error al leer la habitación.", error);
    }
  };

  return (
    <div className="card border-0">
      <div className="row g-0">
        <div className="col-12 col-md-6">
          <img
            src={offer.image_path}
            alt={offer.title}
            className="img-fluid rounded "
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <div className="card-body p-0 ms-md-4">
            <h5 className="card-title title-medium">{offer.title}</h5>
            <p className="card-text body-medium">{offer.description}</p>
            <Link to="/" className="btn p-0">
              <Button
                name="Ver más detalles"
                btnCustom="solid-btn-tertiary"
                btnText="label-small"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
