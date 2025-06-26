export default function ModalRoomDetail({ room, onClose }) {
  return (
    <div className="modal show d-block modal-overlay">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content reserva-modal">
          <div className="modal-header row mb-2 px-0 pt-0">
            <div className="col ">
              <span className="modal-title headline-medium">
                {"Habitación " + room.room_number}
              </span>
            </div>
            <button className="col-auto close" type="button" onClick={onClose}>
              <i className="bi bi-x-square"></i>
            </button>
          </div>
          <div className="modal-body d-flex flex-column px-0">
            <div className="px-0">
              <img
                src={room.photo_path}
                alt={"Habitación " + room.room_number}
                className="img-fluid rounded"
                style={{
                  width: "100%",
                }}
              />
            </div>
            <div className="px-0 pt-3">
              <table className="table align-middle">
                <tbody>
                  <tr className="px-0">
                    <th scope="row" className="p-0 headline-xsmall">
                      Características
                    </th>
                    <td className="px-0"></td>
                  </tr>
                  <tr className="px-0">
                    <td className="px-0">
                      <strong>Tipo de habitación: </strong>
                    </td>
                    <td className="px-0">{room.room_type}</td>
                  </tr>
                  <tr className="px-0">
                    <td className="px-0">
                      <strong>Piso: </strong>
                    </td>
                    <td className="px-0">{room.floor}</td>
                  </tr>
                  <tr className="px-0">
                    <th scope="row" className="headline-xsmall p-0">
                      Servicios
                    </th>
                    <td className="px-0"></td>
                  </tr>
                  <tr className="px-0">
                    <td className="px-0">
                      <ul>
                        {/** Recorrer cada elemento del array facilities */}
                        {/** Key identifica cada dafility de forma única */}
                        {room.facilities.map((facility, index) => (
                          <li key={index}>{facility}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-0"></td>
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
