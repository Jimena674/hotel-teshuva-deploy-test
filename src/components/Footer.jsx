import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (section) => {
    if (location.pathname !== "/") {
      navigate("/#" + section);
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <hr className="mt-0" />
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
                  <RouterLink to="/" className="text-decoration-none text-dark">
                    <i className="bi bi-facebook fs-3" />
                  </RouterLink>
                </div>
                <div className="col-auto">
                  <RouterLink to="/" className="text-decoration-none text-dark">
                    <i className="bi bi-instagram fs-3" />
                  </RouterLink>
                </div>
                <div className="col-auto">
                  <RouterLink to="/" className="text-decoration-none text-dark">
                    <i className="bi bi-twitter fs-3" />
                  </RouterLink>
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
              <a
                onClick={() => scrollToSection("inicio")}
                smooth={true}
                duration={500}
                className="title-small"
                style={{ cursor: "pointer" }}
              >
                Inicio
              </a>
              <a
                onClick={() => scrollToSection("habitaciones")}
                smooth={true}
                duration={500}
                className="title-small"
                style={{ cursor: "pointer" }}
              >
                Habitaciones
              </a>
              <a
                onClick={() => scrollToSection("ofertas")}
                smooth={true}
                duration={500}
                className="title-small"
                style={{ cursor: "pointer" }}
              >
                Ofertas
              </a>
              <a
                onClick={() => scrollToSection("ubicacion")}
                smooth={true}
                duration={500}
                className="title-small"
                style={{ cursor: "pointer" }}
              >
                Ubicación
              </a>
              <RouterLink to="/" className="title-small">
                Buscar reserva
              </RouterLink>
              <RouterLink to="/signin" className="title-small">
                Iniciar Sesión
              </RouterLink>
              <RouterLink to="/signup" className="title-small">
                Registrarse
              </RouterLink>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
