import NavbarWebpage from "../components/web/NavbarWebpage";
import FooterWebpage from "../components/web/FooterWebpage";
import BookingForm from "../components/web/BookingForm";
import RoomCard from "../components/web/RoomCard";
import CardITD from "../components/web/CardITD";
import TitleWebpage from "../components/web/TitleWebpage";
import OfferCard from "../components/web/OfferCard";
import IconText from "../components/common/IconText";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AlertMessage from "../components/common/AlertMessage";

export default function Home() {
  const location = useLocation();
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  // Estado para mostrar mensajes
  const [messageType, setMessageType] = useState("");

  // Estado para obtener los datos de las habitaciones
  const [rooms, setRooms] = useState([]);
  const [messageReadRooms, setMessageReadRooms] = useState("");

  // Función para obtener los datos de las habitaciones
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`/api/room/`);
        const data = await res.json();
        console.log("Datos recibidos:", data);
        if (res.ok) {
          setRooms(data);
        } else {
          setMessageType("error");
          setMessageReadRooms(
            `❌ ${
              data.message ||
              "Error al consultar los datos de las habitaciones."
            }`
          );
        }
      } catch (error) {
        setMessageReadRooms(
          "❌ Error al consultar los datos de las habitaciones."
        );
        setMessageType("error");
        console.error(error);
      }
    };
    fetchRooms();
  }, []);

  // Estado para obtener los datos de las ofertas
  const [offers, setOffers] = useState([]);
  const [messageReadOffers, setMessageReadOffers] = useState("");

  // Función para obtener los datos de las ofertas
  // useEffect hace una llamada a la API con fetch, esta es la API que creamos con express, la API es la que hace la consulta a la BD.
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        // Consulta a base de datos
        const res = await fetch(`/api/offer/`);
        // Parsear la respuesta a JSON
        const data = await res.json();
        console.log("Datos recibidos:", data);
        if (res.ok) {
          setOffers(data);
        } else {
          setMessageType("error");
          setMessageReadOffers(
            "❌ Error al consultar los datos de las ofertas."
          );
        }
      } catch (error) {
        console.error("Error al leer las ofertas.", error);
      }
    };
    fetchOffers();
  }, []);

  return (
    <>
      <div className="container p-0">
        <section id="inicio">
          <NavbarWebpage />
          <BookingForm />
          <img
            src="/images/hotel-standret.jpg"
            className="img-fluid rounded mt-4 mb-5"
            alt="Foto del hotel Teshuva"
          />
        </section>
        {/*Información general del hotel.*/}
        <section id="teshuva" className="container p-0 mb-5">
          <div className="container p-0 mb-4">
            <TitleWebpage
              title="Hotel Teshuvá"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
              titleFont="display-medium"
              descriptionFont="body-large"
            />
            <div className="row gx-2">
              <div className="col-12 col-sm-6 col-lg-3">
                <CardITD
                  image="/images/hotel-mrsiraphol.jpg"
                  title="Hotel Teshuvá"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
                  heightImg="200px"
                  widthImg="100%"
                  objectFitImg="cover"
                />
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <CardITD
                  image="/images/hotel-freepik-4.jpg"
                  title="Hotel Teshuvá"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
                  heightImg="200px"
                  widthImg="100%"
                  objectFitImg="cover"
                />
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <CardITD
                  image="/images/hotel-rcnradio.jpg"
                  title="Hotel Teshuvá"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
                  heightImg="200px"
                  widthImg="100%"
                  objectFitImg="cover"
                />
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <CardITD
                  image="/images/hotel-cerosetenta.jpg"
                  title="Hotel Teshuvá"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
                  heightImg="200px"
                  widthImg="100%"
                  objectFitImg="cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/*Información de las habitaciones.*/}

        <section id="habitaciones" className="container p-0 mb-5">
          <TitleWebpage
            title="Habitaciones"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
            titleFont="display-medium"
            descriptionFont="body-large"
          />
          <div className="row gx-2">
            {rooms.map((room) => (
              <div className="col-12 col-sm-6 col-lg-3" key={room.id_room}>
                <RoomCard room={room} />
              </div>
            ))}
          </div>
        </section>

        {/*Información de las ofertas.*/}

        <section id="ofertas" className="container p-0 mb-5">
          <TitleWebpage
            title="Ofertas Especiales"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
            titleFont="display-medium"
            descriptionFont="body-large"
          />
          <div className="row gx-2">
            {offers.map((offer) => (
              <div className="col-12 col-lg-6 mb-4" key={offer.id_offer}>
                <OfferCard offer={offer} />
                <AlertMessage type={messageType} message={messageReadOffers} />
              </div>
            ))}
          </div>
          {/** 
          <div className="row gx-2">
            <div className="col-12 col-lg-6 mb-4">
              <OfferCard
                image="/images/offer-1.jpg"
                title="Ofertas"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros."
                heightImg="200px"
                widthImg="100%"
                objectFitImg="cover"
              />
            </div>
            <div className="col-12 col-lg-6 mb-4">
              <OfferCard
                image="/images/offer-2.jpg"
                title="Ofertas"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros."
                heightImg="200px"
                widthImg="100%"
                objectFitImg="cover"
              />
            </div>
            <div className="col-12 col-lg-6 mb-4">
              <OfferCard
                image="/images/offer-3.jpg"
                title="Ofertas"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros."
                heightImg="200px"
                widthImg="100%"
                objectFitImg="cover"
              />
            </div>
            <div className="col-12 col-lg-6">
              <OfferCard
                image="/images/offer-4.jpg"
                title="Ofertas"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros."
                heightImg="200px"
                widthImg="100%"
                objectFitImg="cover"
              />
            </div>
          </div>
          */}
        </section>

        {/*Información de contacto y ubicación*/}

        <section id="ubicacion" className="container p-0 mb-5">
          <TitleWebpage
            title="Ubicación"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
            titleFont="display-medium"
            descriptionFont="body-large"
          />
          <div className="row">
            <div className="col-12 col-md-5">
              <div>
                <h1 className="headline-small mb-3">Información de Contacto</h1>
                {/*Adress*/}
                <IconText
                  icon="bi bi-geo-alt-fill"
                  font="body-medium"
                  iconSize="1rem"
                  description="Municipio de El Colegio, Departamento de Cundinamarca."
                />
              </div>
              <div className="mt-2">
                {/*Telephone number*/}
                <IconText
                  icon="bi bi-telephone-fill"
                  font="body-medium"
                  iconSize="1rem"
                  description="+57 000 000 0000"
                />
              </div>
              <div className="mt-2">
                {/*Whatsapp*/}
                <IconText
                  icon="bi bi-whatsapp"
                  font="body-medium"
                  iconSize="1rem"
                  description="+57 000 000 0000"
                />
              </div>
              <div className="mt-2">
                {/*website*/}
                <IconText
                  icon="bi bi-globe2"
                  font="body-medium"
                  iconSize="1rem"
                  description="www.hotelteshuva.com"
                />
              </div>
            </div>
            <div className="col-12 col-md-7 mt-4 mt-md-0">
              <h1 className="headline-small mb-3">Ubicación</h1>
              <img
                src="/images/map.png"
                alt="Mapa de ubicación geográfica del hotel"
                className="img-fluid rounded"
                //style={{ height: "400px", width: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>
      </div>
      <FooterWebpage />
    </>
  );
}
