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
                <h5 className="title-small">¿En qué podemos ayudarte?</h5>
                <h6 className="title-large" style={{ color: "#27174e" }}>
                  (+57) 000 000 0000
                </h6>
                <h5 className="body-small">Número de asistencia</h5>
              </div>
              <div className="d-flex row justify-content-start">
                <div className="col-auto">
                  <Link to="/" className="text-decoration-none text-dark">
                    <i className="bi bi-facebook fs-3" />
                  </Link>
                </div>
                <div className="col-auto">
                  <Link to="/" className="text-decoration-none text-dark">
                    <i className="bi bi-instagram fs-3" />
                  </Link>
                </div>
                <div className="col-auto">
                  <Link to="/" className="text-decoration-none text-dark">
                    <i className="bi bi-twitter fs-3" />
                  </Link>
                </div>
              </div>
              <div className="row">
                <span className="body-small">© 2025 Techuvá</span>
              </div>
            </div>
            {/* Enlaces del sitio web */}
            <div
              className="d-flex flex-column justify-content-start text-end"
              style={{ height: "200px" }}
            >
              <NavLink to="/" className="title-small">
                Inicio
              </NavLink>
              <NavLink to="/" className="title-small">
                Habitaciones
              </NavLink>
              <NavLink to="/" className="title-small">
                Ofertas
              </NavLink>
              <NavLink to="/" className="title-small">
                Ubicación
              </NavLink>
              <NavLink to="/" className="title-small">
                Buscar reserva
              </NavLink>
              <NavLink to="/signin" className="title-small">
                Iniciar Sesión
              </NavLink>
              <NavLink to="/signup" className="title-small">
                Registrarse
              </NavLink>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
