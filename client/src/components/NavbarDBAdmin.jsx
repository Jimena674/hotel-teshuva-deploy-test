import { Link } from "react-router-dom";
import Button from "./Button";

export default function NavbarDashboard() {
  return (
    <>
      <header>
        <nav className=" navbar d-flex p-0">
          <div className="container-fluid">
            <div className="d-flex">
              <span className="navbar-brand display-medium">Hotel Teshuvá</span>
            </div>

            {/*Barra de búsqueda*/}
            <form className="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Reserva, habitación, etc."
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
                <i className="bi bi-box-arrow-left fs-3"></i>
              </Link>
              <Link to={"/"} className="text-decoration-none text-dark">
                <i class="bi bi-gear fs-3 ps-4"></i>
              </Link>
              <Link to={"/"} className="text-decoration-none text-dark">
                <i class="bi bi-bell fs-3 ps-4"></i>
              </Link>

              <img
                src="../../public/images/person-circle.svg"
                alt=""
                className="ps-4 user-navbar-img"
                width="75px"
              />

              <div className="d-flex flex-column ps-3">
                <div className="d-flex headline-small">
                  Jenny Carolina Van Doorne
                </div>
                <div className="d-flex body-medium">Administradora</div>
              </div>
            </div>
          </div>
        </nav>
        <hr className="mt-0" />
      </header>
    </>
  );
}
