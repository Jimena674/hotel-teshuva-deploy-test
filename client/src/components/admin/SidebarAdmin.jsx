import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function SidebarAdmin() {
  // Estado para abrir el submenú en habitaciones
  const [roomOpen, setRoomOpen] = useState(false);

  return (
    <>
      <div
        id="sidebar"
        className="list-group list-group-flush border-end h-100"
      >
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            "list-group-item list-group-item-action label-medium" +
            (isActive ? "active label-medium" : "")
          }
        >
          Inicio
        </NavLink>
        <NavLink
          to="/admin/dashboard/users"
          className={({ isActive }) =>
            "list-group-item list-group-item-action label-medium" +
            (isActive ? "active label-medium" : "")
          }
        >
          Usuarios
        </NavLink>
        <NavLink
          to="/admin/dashboard/bookings"
          className={({ isActive }) =>
            "list-group-item list-group-item-action label-medium" +
            (isActive ? "active label-medium" : "")
          }
        >
          Reservas
        </NavLink>
        <NavLink
          to="/admin/dashboard/rooms"
          className={({ isActive }) =>
            "list-group-item list-group-item-action label-medium" +
            (isActive ? "active label-medium" : "")
          }
          onClick={() => setRoomOpen(!roomOpen)}
        >
          Habitaciones
        </NavLink>

        {/** Submenú de las habitaciones */}
        {roomOpen && (
          <div className="submenu">
            <NavLink
              to="/admin/dashboard/facilities"
              className={({ isActive }) =>
                "list-group-item list-group-item-action label-small nav-link" +
                (isActive ? "active " : "")
              }
            >
              Servicios de las habitaciones
            </NavLink>
          </div>
        )}

        <NavLink
          to="/admin/dashboard/offers"
          className={({ isActive }) =>
            "list-group-item list-group-item-action label-medium" +
            (isActive ? "active label-medium" : "")
          }
        >
          Ofertas
        </NavLink>
        <NavLink
          to="/admin/dashboard/payments"
          className={({ isActive }) =>
            "list-group-item list-group-item-action label-medium disabled" +
            (isActive ? "active label-medium" : "")
          }
        >
          Pagos
        </NavLink>

        <NavLink
          to="/admin/dashboard/reports"
          className={({ isActive }) =>
            "list-group-item list-group-item-action label-medium disabled" +
            (isActive ? "active label-medium" : "")
          }
        >
          Estadísticas
        </NavLink>
      </div>
    </>
  );
}
