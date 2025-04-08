import NavbarWebpage from "../../components/NavbarWebpage";
import Footer from "../../components/Footer";
import BookingForm from "../../components/BookingForm";
import CardITDB from "../../components/CardITDB";
import CardITD from "../../components/CardITD";
import TitleWebpage from "../../components/TitleWebpage";
import CardHorITDB from "../../components/CardHorITDB";
import IconText from "../../components/IconText";

export default function Home() {
  return (
    <>
      <NavbarWebpage />
      <BookingForm />
      <main className="container mt-3">
        <img
          src="/images/hotel-standret.jpg"
          className="img-fluid rounded mb-4"
          alt="Foto del hotel Teshuva"
        />
        {/*Información general del hotel.*/}
        <section className="container p-0 mb-4">
          <TitleWebpage
            title="Hotel Teshuvá"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
            titleFont="display-medium"
            descriptionFont="body-large"
          />
          <div className="row gx-2">
            <div className="col-12 col-sm-6 col-lg-3">
              <CardITD
                image="/images/hotel-freepik.jpg"
                title="Hotel Teshuvá"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <CardITD
                image="/images/hotel-freepik.jpg"
                title="Hotel Teshuvá"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <CardITD
                image="/images/hotel-freepik.jpg"
                title="Hotel Teshuvá"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <CardITD
                image="/images/hotel-freepik.jpg"
                title="Hotel Teshuvá"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
              />
            </div>
          </div>
        </section>
        {/*Información de las habitaciones.*/}
        <section className="container p-0 mb-4">
          <TitleWebpage
            title="Habitaciones"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
            titleFont="display-medium"
            descriptionFont="body-large"
          />
          <div className="row gx-2">
            <div className="col-12 col-sm-6 col-lg-3">
              <CardITDB
                image="/images/hotel-freepik.jpg"
                title="Habitación"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <CardITDB
                image="/images/hotel-freepik.jpg"
                title="Habitación"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <CardITDB
                image="/images/hotel-freepik.jpg"
                title="Habitación"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <CardITDB
                image="/images/hotel-freepik.jpg"
                title="Habitación"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
              />
            </div>
          </div>
        </section>
        {/*Información de las ofertas.*/}
        <section className="container p-0 mb-4">
          <TitleWebpage
            title="Ofertas Especiales"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
            titleFont="display-medium"
            descriptionFont="body-large"
          />
          <div className="row gx-2">
            <div className="col-12 col-lg-6 mb-4">
              <CardHorITDB
                image="/images/hotel-freepik.jpg"
                title="Ofertas"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros."
              />
            </div>
            <div className="col-12 col-lg-6 mb-4">
              <CardHorITDB
                image="/images/hotel-freepik.jpg"
                title="Ofertas"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros."
              />
            </div>
            <div className="col-12 col-lg-6 mb-4">
              <CardHorITDB
                image="/images/hotel-freepik.jpg"
                title="Ofertas"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros."
              />
            </div>
            <div className="col-12 col-lg-6">
              <CardHorITDB
                image="/images/hotel-freepik.jpg"
                title="Ofertas"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros."
              />
            </div>
          </div>
        </section>
        {/*Información de contacto y ubicación*/}
        <section className="container p-0 mb-4">
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
      </main>
      <hr />
      <Footer />
    </>
  );
}
