import { Link as RouterLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Button";
import ButtonIcon from "../ButtonIcon";
import ConsultarReserva from "./ConsultarReserva";

export default function NavbarWebpage() {
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
      <header>
        {/* Primera Franja: Logo + Login/Register */}
        <nav className="container navbar navbar-expand-md py-2 w-100 pb-0 d-flex flex-column">
          <div className="container-fluid d-flex justify-content-between align-items-center p-0">
            {/* Logo */}
            <img
              src="../../../public/images/logo-h-teshuva.png"
              alt="Logo del hotel Teshuva"
              height={80}
              width={80}
            />
            {/* Enlaces de Iniciar sesión y Registro */}
            <div className="mt-2 mt-md-0">
              <RouterLink to="/signin">
                <ButtonIcon
                  name="Iniciar Sesión"
                  btnCustom="navbar-btn"
                  btnText="label-medium"
                  icon="bi bi-person-fill-check"
                  fontSize="1.1rem"
                  marginIcon="ms-2"
                />
              </RouterLink>
              <RouterLink
                to="/signup"
                className="border-start border-black border-2"
              >
                <ButtonIcon
                  name="Registrarse"
                  btnCustom="navbar-btn"
                  btnText="label-medium"
                  icon="bi bi-person-fill-add"
                  fontSize="1.1rem"
                  marginIcon="ms-2"
                />
              </RouterLink>
            </div>
          </div>
          {/* Segunda Franja: Menú de navegación */}
          <div className="container my-2 mt-md-0 p-0">
            {/* Botón para móviles */}
            <button
              className="navbar-toggler fs-6"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNavbar"
              aria-controls="mainNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            {/* Menú de navegación */}
            <div className="collapse navbar-collapse" id="mainNavbar">
              <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                <li className="nav-item">
                  <RouterLink to="/">
                    <Button
                      name="Inicio"
                      btnCustom="navbar-btn"
                      btnText="body-medium"
                    />
                  </RouterLink>
                </li>
                <li className="nav-item">
                  <a
                    onClick={() => scrollToSection("teshuva")}
                    smooth={true}
                    duration={500}
                  >
                    <Button
                      name="Teshuvá"
                      btnCustom="navbar-btn"
                      btnText="body-medium"
                    />
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={() => scrollToSection("habitaciones")}
                    smooth={true}
                    duration={500}
                  >
                    <Button
                      name="Habitaciones"
                      btnCustom="navbar-btn"
                      btnText="body-medium"
                    />
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={() => scrollToSection("ofertas")}
                    smooth={true}
                    duration={500}
                  >
                    <Button
                      name="Ofertas"
                      btnCustom="navbar-btn"
                      btnText="body-medium"
                    />
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={() => scrollToSection("ubicacion")}
                    smooth={true}
                    duration={500}
                  >
                    <Button
                      name="Ubicación"
                      btnCustom="navbar-btn"
                      btnText="body-medium"
                    />
                  </a>
                </li>
                <li className="nav-item">
                  <ConsultarReserva />
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <hr className="mt-0" />
      </header>
    </>
  );
}
