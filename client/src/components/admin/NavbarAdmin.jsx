import { Link } from "react-router-dom";
import Button from "../common/Button";
import { useState, useEffect } from "react";

export default function NavbarDashboard() {
  // Traer la información del backend
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  return (
    <>
      <header>
        <nav className=" navbar d-flex p-0">
          <div className="container-fluid">
            <div className="d-flex">
              <span className="navbar-brand display-small">Hotel Teshuvá</span>
            </div>

            {/*Barra de búsqueda*/}
            <form className="d-flex col-4" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Reserva, habitación, usuario, etc."
                aria-label="Search"
              />
              <Button
                name="Buscar"
                btnCustom="booking-form-btn"
                btnText="label-small"
              />
            </form>

            {/*Botones y datos del usuario*/}
            <div className="d-flex align-items-center">
              <Link to={"/"} className="text-decoration-none text-dark">
                <i className="bi bi-box-arrow-left fs-4"></i>
              </Link>
              <Link to={"/"} className="text-decoration-none text-dark">
                <i className="bi bi-gear fs-4 ps-4"></i>
              </Link>
              <Link to={"/"} className="text-decoration-none text-dark">
                <i className="bi bi-bell fs-4 ps-4"></i>
              </Link>

              <img
                src="../../public/images/person-circle.svg"
                alt=""
                className="ps-4 user-navbar-img"
                width="70px"
              />

              <div className="d-flex flex-column ps-3">
                {user && (
                  <span className="d-flex headline-xsmall">
                    {user.name} {user.last_name}
                  </span>
                )}
                {user && (
                  <span className="d-flex body-medium">{user.type}</span>
                )}
              </div>
            </div>
          </div>
        </nav>
        <hr className="mt-0" />
      </header>
    </>
  );
}
