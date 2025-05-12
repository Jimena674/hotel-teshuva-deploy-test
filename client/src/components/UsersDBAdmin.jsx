import { useEffect, useState } from "react"; //Hooks de react

export default function UsersDBAdmin() {
  const [totalUsers, setTotalUsers] = useState(null); //Variable de estado que inicializa como null

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/users/count"); // Se almacena la respuesta del backend
        const data = await res.json(); // Se parsea la respuesta del servidor en formato JSON
        setTotalUsers(data.total);
      } catch (error) {
        console.error("Error al obtener el total de usuarios: ", error);
      }
    };

    fetchTotal();
  }, [totalUsers]); // Array de dependencias: se ejecuta cuando camabia totalUsers

  return (
    <>
      <h1 className="display-small">
        Usuarios Registrados: {totalUsers !== null && `(${totalUsers})`}
      </h1>
    </>
  );
}
