import Navbar from "../../components/NavbarWebpage";
import Footer from "../../components/Footer";

export default function SingUp() {
  return (
    <>
      <Navbar />
      <main className="container d-flex justify-content-center">
        <div className="d-flex flex-column w-50">
          <h2 className="text-center">Únete al Hotel Teshuva</h2>
          <span className="form-text mt-4">
            Todos los campos son requeridos.
          </span>
          <form action="" className="mt-5">
            {/*Nombre*/}
            <div className="d-flex gap-2">
              <div className="col">
                <label htmlFor="" className="form-label">
                  Nombres
                </label>
                <input type="text" className="form-control" id="" required="" />
              </div>
              <div className="col">
                <label htmlFor="" className="form-label">
                  Apellidos
                </label>
                <input type="text" className="form-control" id="" required="" />
              </div>
            </div>
            {/*identificacion*/}
            <div className="d-flex gap-2 mt-4">
              <div className="col">
                <label htmlFor="" className="form-label">
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
                <label htmlFor="" className="form-label">
                  Número de Identificación
                </label>
                <input type="text" className="form-control" id="" required="" />
              </div>
            </div>
            <div className="d-flex gap-2 mt-4">
              {/*Telefono*/}
              <div className="col">
                <label htmlFor="" className="form-label">
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
                <label htmlFor="" className="form-label">
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
              <label htmlFor="tipoUsuario" className="form-label">
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
            {/*Contraseña*/}
            <div className="d-flex flex-column mt-4">
              <div className="flex-row">
                <label htmlFor="" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  required=""
                />
              </div>
              <div className="row">
                <div className="col">
                  <ul>
                    <li className="form-text">
                      Debe contener mínimo 8 caracteres.
                    </li>
                    <li className="form-text">
                      Debe contener una letra en minúscula y mayúscula.
                    </li>
                  </ul>
                </div>
                <div className="col">
                  <ul>
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
              <label htmlFor="" className="form-label">
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
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary mt-4">
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </main>

      <hr />
      <Footer />
    </>
  );
}
