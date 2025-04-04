import { Link, NavLink } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <footer className="mb-4">
        <div className="container w-100">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <div
              className="d-flex flex-column justify-content-between"
              style={{ height: "200px" }}
            >
              <div className="row">
                <h5>¿Cómo podemos ayudarte?</h5>
                <h6>(+57) 000 000 0000</h6>
              </div>
              <div className="d-flex row justify-content-start">
                <div className="col-1">
                  <Link to="" className="text-decoration-none text-dark">
                    <i className="bi bi-facebook" />
                  </Link>
                </div>
                <div className="col-1">
                  <Link to="" className="text-decoration-none text-dark">
                    <i className="bi bi-instagram" />
                  </Link>
                </div>
                <div className="col-1">
                  <Link to="" className="text-decoration-none text-dark">
                    <i className="bi bi-twitter" />
                  </Link>
                </div>
              </div>
              <div className="row">
                <span>© 2024 Techuvá</span>
              </div>
            </div>
            {/* Enlaces del sitio web */}
            <div
              className="d-flex flex-column justify-content-start text-end"
              style={{ height: "200px" }}
            >
              <NavLink to="">Inicio</NavLink>
              <NavLink to="">Habitaciones</NavLink>
              <NavLink to="">Ofertas</NavLink>
              <NavLink to="">Ubicación</NavLink>
              <NavLink to="">Buscar reserva</NavLink>
              <NavLink to="">Registrarse</NavLink>
              <NavLink to="">Iniciar Sesión</NavLink>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
