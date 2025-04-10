import Navbar from "../../components/NavbarWebpage";
import Footer from "../../components/Footer";
import ButtonIcon from "../../components/ButtonIcon";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

export default function SingUp() {
  return (
    <>
      <Navbar />
      <main className="container d-flex justify-content-center">
        <div className="d-flex flex-column signup-container ">
          <h2 className="text-center display-small">Únete al Hotel Teshuva</h2>
          <span className="form-text mt-2 body-medium">
            Todos los campos son requeridos.
          </span>
          <form action="" className="mt-3">
            {/*Nombre*/}
            <div className="d-flex gap-2">
              <div className="col">
                <label htmlFor="" className="form-label label-medium">
                  Nombres
                </label>
                <input type="text" className="form-control" id="" required="" />
              </div>
              <div className="col">
                <label htmlFor="" className="form-label label-medium">
                  Apellidos
                </label>
                <input type="text" className="form-control" id="" required="" />
              </div>
            </div>
            {/*identificacion*/}
            <div className="d-flex gap-2 mt-4">
              <div className="col">
                <label htmlFor="" className="form-label label-medium">
                  Tipo de Identificación
                </label>
                <select name="" id="" className="form-select" required="">
                  <option value="" selected="" />
                  <option value={1}>Cédula de Ciudadanía</option>
                  <option value={2}>Pasaporte</option>
                  <option value={3}>Tarjeta de Extranjería</option>
                  <option value={4}>Permiso Especial de Permanencia</option>
                </select>
              </div>
              <div className="col">
                <label htmlFor="" className="form-label label-medium">
                  Número de Identificación
                </label>
                <input type="text" className="form-control" id="" required="" />
              </div>
            </div>
            <div className="d-flex gap-2 mt-4">
              {/*Telefono*/}
              <div className="col">
                <label htmlFor="" className="form-label label-medium">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone1"
                  className="form-control w-100"
                  required=""
                />
              </div>
              {/*Fecha de nacimiento*/}
              <div className="col">
                <label htmlFor="" className="form-label label-medium">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  className="form-control w-100"
                  required=""
                />
              </div>
            </div>
            {/*Tipo de usuario*/}
            <div className="mt-4">
              <label htmlFor="tipoUsuario" className="form-label label-medium">
                Tipo de Usuario
              </label>
              <select
                name=""
                id="tipoUsuario"
                className="form-select"
                required=""
              >
                <option value="" selected="" />
                <option value="administrativo">Administrativo</option>
                <option value="huesped">Huésped</option>
              </select>
            </div>
            {/*Correo electrónico*/}
            <div className="mt-4">
              <label htmlFor="tipoUsuario" className="form-label label-medium">
                Correo Electrónico
              </label>
              <input type="email" className="form-control" id="" required="" />
            </div>
            {/*Contraseña*/}
            <div className="d-flex flex-column mt-4">
              <div className="flex-row">
                <div className="p-0 d-flex justify-content-between">
                  <label htmlFor="" className="form-label label-medium">
                    Contraseña
                  </label>
                  <ButtonIcon
                    name="mostrar"
                    btnText="body-small"
                    icon="bi bi-eye"
                    fontSize="0.75rem"
                    paddingBtn="p-0"
                    textDecoration="text-decoration-underline"
                    marginIcon="ms-2"
                  />
                </div>
                <input
                  type="password"
                  className="form-control"
                  pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  required=""
                />
              </div>
              <div className="row">
                <div className="col-12 col-lg-6 p-0 ">
                  <ul className="ps-4 m-0">
                    <li className="form-text">
                      Debe contener mínimo 8 caracteres.
                    </li>
                    <li className="form-text">
                      Debe contener una letra en minúscula y mayúscula.
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-lg-6 p-0 ">
                  <ul className="ps-4 m-0">
                    <li className="form-text">
                      Debe contener un número (0-9).
                    </li>
                    <li className="form-text">
                      Debe contener un caracter especial (@$!%*?&amp;).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/*Confirmar contraseña*/}
            <div>
              <label htmlFor="" className="form-label label-medium mt-4">
                Confirmar Contraseña
              </label>
              <input type="password" className="form-control" required="" />
            </div>
            <div className="form-text mt-4">
              Al presional registrarme, estoy de acuerdo con los términos y
              condiciones del Hotel Teshuvá y estoy de acuerdo en que se
              almacene, use, comparta y transfiera la información de conformidad
              con lo dispuesto en las condiciones de privacidad. También estoy
              de acuerdo en recibir ofertas y promociones vía correo
              electrónico, entendiendo que puedo cancelar la suscripción al
              cambiar las preferencias en mi perfil.
            </div>
            <div className="my-4">
              <Link to="/" className="p-0 d-grid text-decoration-none">
                <Button
                  btnCustom="solid-btn-primary"
                  btnText="label-small"
                  name="Registrarse"
                  btnType="submit"
                  paddingBtn="px-4"
                />
              </Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
