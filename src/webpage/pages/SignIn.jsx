import Navbar from "../../components/NavbarWebpage";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

export default function SingIn() {
  return (
    <>
      <Navbar />
      <main className="container">
        <div className="row justify-content-center">
          <div className="col">
            <img src="/images/signup-storyset.svg" alt="" />
          </div>
          <div className="col d-flex justify-content-center align-items-center">
            {/*Card que contiene el formulario para iniciar sesión.*/}
            <div style={{ width: "400px" }} className="card text-bg-primary">
              <div className=" row align-items-center">
                <h2 className="text-center">Iniciar Sesión</h2>
                <hr />
              </div>
              <div className="row mx-4">
                <span className="p-0">Todos los campos son requeridos.</span>
              </div>
              <div className="row mt-4 mx-4">
                <label htmlFor="" className="form-label p-0">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id=""
                  required=""
                />
              </div>
              <div className="row mt-4 mx-4">
                <label htmlFor="" className="form-label p-0">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id=""
                  required=""
                />
              </div>
              <div className="row mx-4 mt-4">
                <Link to="/">
                  <span className="p-0 ">¿Olvidaste tu contraseña?</span>
                </Link>
              </div>
              <div className="row mx-4 mt-4">
                <Link to="/">
                  <Button
                    name="Iniciar Sesión"
                    btnCustom="navbar-btn"
                    btnText="label-medium"
                  />
                </Link>
              </div>
              <div className="row mx-4 my-4">
                <div className="col-auto">
                  <span className="p-0 ">¿No tienes usuario?</span>
                </div>
                <div className="col-auto">
                  <Link to="/signup">
                    <span className="p-0">Crear una cuenta</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <hr />
      <Footer />
    </>
  );
}
