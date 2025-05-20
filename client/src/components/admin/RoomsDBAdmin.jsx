import { useEffect, useState } from "react";

export default function RoomsDBAdmin() {
  {
    /* Estado para traer las habitaciones de la base de datos */
  }

  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
      } catch (error) {}
    };
  });

  return (
    <>
      <div className="container-fluid">
        <h1 className="title-large">Listado de habitaciones</h1>
        {/* Tabla de habitaciones */}
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Foto</th>
              <th scope="col">Nombre</th>
              <th scope="col">Tarifa</th>
              <th scope="col">Servicios</th>
              <th scope="col">
                <select id="type-select" className="form-select">
                  <option value="todos" disabled hidden>
                    Tipo de habitación
                  </option>
                  <option value="todos">Todos</option>
                  <option value="individual"> Habitación individual</option>
                  <option value="doble"> Habitación doble</option>
                </select>
              </th>
              <th scope="col">
                <select id="floor-select" className="form-select">
                  <option value="todos" disabled hidden>
                    Piso
                  </option>
                  <option value="todos">Todos</option>
                  <option value="uno">Piso 1</option>
                  <option value="dos">Piso 2</option>
                </select>
              </th>
              <th scope="col">
                <select id="status-select" className="form-select">
                  <option value="todos" disabled hidden>
                    Estado
                  </option>
                  <option value="todos">Todos</option>
                  <option value="occupied">Ocupada</option>
                  <option value="vacant-clean">Disponible limpia</option>
                  <option value="vacant-dirty">Disponible sucia</option>
                  <option value="out-of-order">Fuera de servicio</option>
                </select>
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
}
