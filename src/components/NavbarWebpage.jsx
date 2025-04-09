import { NavLink } from "react-router-dom";
import Button from "./Button";
import ButtonIcon from "./ButtonIcon";

export default function NavbarWebpage() {
  return (
    <>
      <header>
        {/* Primera Franja: Logo + Login/Register */}
        <nav className="container navbar navbar-expand-md py-2 w-100 pb-0 d-flex flex-column">
          <div className="container-fluid d-flex justify-content-between align-items-center ">
            {/* Logo */}
            <img
              src="../../../public/images/logo-h-teshuva.png"
              alt="Logo del hotel Teshuva"
              height={80}
              width={80}
            />
            {/* Enlaces de Iniciar sesión y Registro */}
            <div className="mt-2 mt-md-0">
              <NavLink to="/signin">
                <ButtonIcon
                  name="Iniciar Sesión"
                  btnCustom="navbar-btn"
                  btnText="label-medium"
                  icon="bi bi-person-fill-check"
                  fontSize="1.1rem"
                  marginIcon="ms-2"
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
                  fontSize="1.1rem"
                  marginIcon="ms-2"
                />
              </NavLink>
            </div>
          </div>
          {/* Segunda Franja: Menú de navegación */}
          <div className="container my-2 mt-md-0">
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
                  <NavLink to="/">
                    <Button
                      name="Inicio"
                      btnCustom="navbar-btn"
                      btnText="body-medium"
                    />
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/">
                    <Button
                      name="Habitaciones"
                      btnCustom="navbar-btn"
                      btnText="body-medium"
                    />
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/">
                    <Button
                      name="Ofertas"
                      btnCustom="navbar-btn"
                      btnText="body-medium"
                    />
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/">
                    <Button
                      name="Ubicación"
                      btnCustom="navbar-btn"
                      btnText="body-medium"
                    />
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/">
                    <Button
                      name="Buscar Reserva"
                      btnCustom="navbar-btn"
                      btnText="body-medium"
                    />
                  </NavLink>
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
