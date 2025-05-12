import { NavLink } from "react-router-dom";

export default function SidebarDBAdmin() {
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
        <a
          href="#"
          className="list-group-item list-group-item-action label-medium disabled"
        >
          Reservas
        </a>
        <a
          href="#"
          className="list-group-item list-group-item-action label-medium disabled"
        >
          Alojamientos
        </a>
        <a
          href="#"
          className="list-group-item list-group-item-action label-medium disabled"
        >
          Habitaciones
        </a>
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
          to="/admin/dashboard/users"
          className={({ isActive }) =>
            "list-group-item list-group-item-action label-medium" +
            (isActive ? "active label-medium" : "")
          }
        >
          Usuarios
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
