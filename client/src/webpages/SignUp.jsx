import Navbar from "../components/NavbarWebpage";
import FooterWebpage from "../components/FooterWebpage";
import ButtonIcon from "../components/ButtonIcon";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SingUp() {
  // Exportar la función de signup
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [id_type_id, setIdTypeId] = useState("");
  const [id_number, setIdNumber] = useSate("");

  const [phone, setPhone] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [user_type_id, setUserTypeId] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          last_name,
          id_type_id,
          id_number,

          phone,
          birth_date,
          email,
          user_type_id,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setName("");
        setLastName("");
        setIdTypeId("");
        setIdNumber("");

        setPhone("");
        setBirthDate("");
        setEmail("");
        setUserTypeId("");
        setPassword("");
        setMensaje("✅ Registro exitoso");
      } else {
        setMensaje(`❌ ${data.message || "Error al registrar"}`);
      }
    } catch (err) {
      setMensaje("❌ Error de conexión con el servidor");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container d-flex justify-content-center">
        <div className="d-flex flex-column signup-container">
          <h2 className="text-center display-small">Únete al Hotel Teshuva</h2>
          <span className="form-text mt-2 body-medium">
            Todos los campos son requeridos.
          </span>
          <form action="" className="mt-3" onSubmit={handleSubmit}>
            {/*Nombre*/}
            <div className="d-flex gap-2">
              <div className="col">
                <label htmlFor="" className="form-label label-medium">
                  Nombres
                </label>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  required=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="" className="form-label label-medium">
                  Apellidos
                </label>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  required=""
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            {/*identificacion*/}
            <div className="d-flex gap-2 mt-4">
              <div className="col">
                <label htmlFor="" className="form-label label-medium">
                  Tipo de Identificación
                </label>
                <select
                  name=""
                  id=""
                  className="form-select"
                  required=""
                  value={id_type_id}
                  onChange={(e) => setIdTypeId(e.target.value)}
                >
                  <option value="" selected="" />
                  <option value={1}>Cédula de ciudadanía</option>
                  <option value={2}>Tarjeta de identidad</option>
                  <option value={3}>Pasaporte</option>
                  <option value={4}>Cédula de Extranjería</option>
                </select>
              </div>
              <div className="col">
                <label htmlFor="" className="form-label label-medium">
                  Número de Identificación
                </label>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  required=""
                  value={id_number}
                  onChange={(e) => setIdNumber(e.target.value)}
                />
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  value={birth_date}
                  onChange={(e) => setBirthDate(e.target.value)}
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
                value={user_type_id}
                onChange={(e) => setUserTypeId(e.target.value)}
              >
                <option value="" selected="" />
                <option value="administrativo">Huésped</option>
                <option value="huesped">Administrativo</option>
              </select>
            </div>
            {/*Correo electrónico*/}
            <div className="mt-4">
              <label htmlFor="tipoUsuario" className="form-label label-medium">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id=""
                required=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            {mensaje && <p>{mensaje}</p>}
          </form>
        </div>
      </main>
      <FooterWebpage />
    </>
  );
}
