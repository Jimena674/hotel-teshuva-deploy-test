import NavbarWebpage from "../../components/NavbarWebpage";
import Footer from "../../components/Footer";
import BookingForm from "../../components/BookingForm";
import CardITDB from "../../components/CardITDB";

export default function Home() {
  return (
    <>
      <NavbarWebpage />
      <BookingForm />
      <main className="container mt-3">
        <img
          src="/images/hotel-standret.jpg"
          className="img-fluid rounded mb-5"
          alt="Foto del hotel Teshuva"
          style={{ height: "600px", width: "100%", objectFit: "cover" }}
        />
        {/*Información general del hotel.*/}
        <section className="container p-0 mb-5">
          <h1 className="display-small">Hotel Teshuvá</h1>
          <p className="body-large">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a
            volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor
            vel, lacinia quis mauris.
          </p>
          <div className="row gx-4">
            <div className="col">
              <CardITDB
                image="/images/hotel-freepik.jpg"
                title="Hotel Teshuvá"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
              />
            </div>
            <div className="col">
              <CardITDB
                image="/images/hotel-freepik.jpg"
                title="Hotel Teshuvá"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
              />
            </div>
            <div className="col">
              <CardITDB
                image="/images/hotel-freepik.jpg"
                title="Hotel Teshuvá"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
              />
            </div>
            <div className="col">
              <CardITDB
                image="/images/hotel-freepik.jpg"
                title="Hotel Teshuvá"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
              />
            </div>
          </div>
        </section>
        <hr />
        <h1 className="text-center">Habitaciones</h1>
        <hr />
        {/*Información de las habitaciones.*/}
        <section className="container p-0 my-5">
          <div className="row gx-4">
            <div className="col">
              <CardITDB
                image="/images/hotel-freepik.jpg"
                title="Habitación"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
              />
            </div>
            <div className="col">
              <CardITDB
                image="/images/hotel-freepik.jpg"
                title="Habitación"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
              />
            </div>
            <div className="col">
              <CardITDB
                image="/images/hotel-freepik.jpg"
                title="Habitación"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
              />
            </div>
            <div className="col">
              <CardITDB
                image="/images/hotel-freepik.jpg"
                title="Habitación"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris."
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
