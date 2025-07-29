import { useState } from "react";
import AlertMessage from "../../common/AlertMessage";

export default function DeleteOffer({ offer, onClose, onDeleteSuccess }) {
  // Estados para eliminar una oferta
  const [messageType, setMessageType] = useState("");
  const [messageDeleteOffer, setMessageDeleteOffer] = useState("");

  /** Función que se comunica con el backend */
  const saveDeleteOffer = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/offer/${offer.id_offer}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessageType("success");
        setMessageDeleteOffer("✅ Oferta eliminada con éxito.");
        setTimeout(() => {
          onClose();
          if (onDeleteSuccess) onDeleteSuccess();
        }, 1500);
      } else {
        setMessageType("error");
        setMessageDeleteOffer(
          `❌ ${data.message || "Error al eliminar la habitación."}`
        );
      }
    } catch (error) {
      console.error("Error al eliminar la oferta: ", error);
      setMessageType("error");
      setMessageDeleteOffer("❌ Error de conexión con el servidor.");
    }
  };

  return (
    <>
      <div className="modal show d-block modal-overlay">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title title-large">Eliminar oferta</span>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <p>¿Está seguro de eliminar la oferta "{offer.title}"?</p>
            </div>
            <div className="modal-footer">
              <button className="btn" onClick={saveDeleteOffer}>
                Eliminar
              </button>
              <button className="btn" onClick={onClose}>
                Cancelar
              </button>
              <AlertMessage type={messageType} message={messageDeleteOffer} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
