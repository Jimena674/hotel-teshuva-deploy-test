import Navbar from "../components/web/NavbarWebpage";
import FooterWebpage from "../components/web/FooterWebpage";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import ButtonIcon from "../components/common/ButtonIcon";
import AlertMessage from "../components/common/AlertMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SingIn() {
  // Definir estados para enviar los datos del frontend al backend
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessageType("success");
        setMessage("✅ " + data.message);

        // Guardar en localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: data.name,
            last_name: data.last_name,
            type: data.type,
          })
        );

        // Redireccionar según el tipo de usuario
        if (data.type === "Administrativo") {
          navigate("/admin/dashboard");
        }
      } else {
        setMessageType("error");
        setMessage("❌ " + (data.message || "Error al iniciar sesión."));
      }
    } catch (error) {
      setMessageType("error");
      setMessage("❌ Error de conexión con el servidor.");
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container">
        <div className="row justify-content-center my-4">
          <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
            <img
              src="/images/hotel-freepik.jpg"
              alt=""
              className="img-fluid rounded"
            />
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center align-items-center mt-4 mt-md-0">
            {/*Card que contiene el formulario para iniciar sesión.*/}
            <form
              style={{ width: "400px" }}
              className="card signin-card"
              onSubmit={handleSubmit}
            >
              <h2 className="text-center p-0 my-2 display-small">
                Iniciar Sesión
              </h2>
              <hr className="mb-2 mt-0" />

              <div className="row mx-4">
                <span className="p-0 form-text body-medium">
                  Todos los campos son requeridos.
                </span>
              </div>
              <div className="row mt-4 mx-4">
                <label htmlFor="" className="form-label p-0 label-medium">
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
              <div className="row mt-4 mx-4">
                <div className="p-0 d-flex justify-content-between">
                  <label htmlFor="" className="form-label p-0 label-medium">
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
                  id=""
                  required=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="row mx-4 mt-2">
                <Link to="/" className="p-0 m-0">
                  <span className="body-small">¿Olvidaste tu contraseña?</span>
                </Link>
              </div>
              <div className="row mx-4 mt-4 ">
                <div to="" className="p-0 d-grid text-decoration-none">
                  <Button
                    name="Iniciar Sesión"
                    btnCustom="solid-btn-tertiary"
                    btnText="label-medium"
                    type="submit"
                  />
                </div>
              </div>
              <div className="row mx-4 my-4">
                <div className="col-auto p-0">
                  <span className="p-0 body-medium">¿No tienes usuario?</span>
                </div>
                <div className="col-auto p-0 ms-2">
                  <Link to="/signup" className="">
                    <span className="p-0 body-medium">Crear una cuenta</span>
                  </Link>
                </div>
              </div>
              <AlertMessage message={message} type={messageType} />
            </form>
          </div>
        </div>
      </main>

      <FooterWebpage />
    </>
  );
}
