export default function SidebarDBAdmin() {
  return (
    <>
      <div
        id="sidebar"
        className="list-group list-group-flush border-end h-100"
      >
        <a
          href="#"
          className="list-group-item list-group-item-action active label-medium"
          aria-current="true"
        >
          Inicio
        </a>
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
        <a
          href="#"
          className="list-group-item list-group-item-action label-medium disabled"
        >
          Pagos
        </a>
        <a
          href="#"
          className="list-group-item list-group-item-action label-medium"
        >
          Usuarios
        </a>
        <a
          href="#"
          className="list-group-item list-group-item-action label-medium disabled"
        >
          Estadísticas
        </a>
      </div>
    </>
  );
}
