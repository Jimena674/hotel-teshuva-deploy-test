export default function ModalRoomDetail({ room, onClose, props }) {
  return (
    <div className="modal show d-block modal-overlay">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content reserva-modal">
          <div className="modal-header row mb-2">
            <div className="col d-flex flex-column justify-content-center">
              <span className="modal-title title-large">
                Información de la Habitación
              </span>
            </div>
            <button
              className="col-auto d-flex flex-column justify-content-center close"
              type="button"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body d-flex">
            <div className="flex-column">
              <img
                src={room.photo_path}
                alt={"Habitación " + room.room_number}
                className="img-fluid rounded"
                style={{
                  width: props.widthImg,
                  height: props.heightImg,
                  objectFit: props.objectFitImg,
                }}
              />
            </div>
            <div className="flex-column">
              <table className="table align-middle">
                <tbody>
                  <tr>
                    <th scope="row">Servicios:</th>
                    <td>{}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
