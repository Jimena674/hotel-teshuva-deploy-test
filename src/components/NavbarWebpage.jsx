import { NavLink } from "react-router-dom";
import Button from "./Button";
import ButtonIcon from "./ButtonIcon";

export default function NavbarWebpage() {
  return (
    <>
      <header>
        {/* Primera Franja: Logo + Login/Register */}
        <nav className="container navbar navbar-expand-lg py-2 w-100">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            {/* Logo */}
            <img
              src="../../../public/images/logo-h-teshuva.png"
              alt="Logo del hotel Teshuva"
              height={80}
              width={80}
            />
            {/* Enlaces de Iniciar sesión y Registro */}
            <div>
              <NavLink to="/signin">
                <ButtonIcon
                  name="Iniciar Sesión"
                  btnCustom="navbar-btn"
                  btnText="label-medium"
                  icon="bi bi-person-fill-check"
                  fontsize="1.1rem"
                />
              </NavLink>
              <NavLink
                to="/signup"
                className="border-start border-black border-2"
              >
                <ButtonIcon
                  name="Registrarse"
                  btnCustom="navbar-btn"
                  btnText="label-medium"
                  icon="bi bi-person-fill-add"
                  fontsize="1.1rem"
                />
              </NavLink>
            </div>
          </div>
        </nav>
        {/* Segunda Franja: Menú de navegación */}
        <nav className="container navbar navbar-expand-lg w-100">
          <div className="container-fluid">
            {/* Botón para móviles */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            {/* Menú de navegación */}
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/">
                    <Button
                      name="Inicio"
                      btnCustom="navbar-btn"
                      btnText="body-large"
                    />
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/">
                    <Button
                      name="Habitaciones"
                      btnCustom="navbar-btn"
                      btnText="body-large"
                    />
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/">
                    <Button
                      name="Ofertas"
                      btnCustom="navbar-btn"
                      btnText="body-large"
                    />
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/">
                    <Button
                      name="Ubicación"
                      btnCustom="navbar-btn"
                      btnText="body-large"
                    />
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/">
                    <Button
                      name="Buscar Reserva"
                      btnCustom="navbar-btn"
                      btnText="body-large"
                    />
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
