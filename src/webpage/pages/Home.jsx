import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookingForm from "../components/BookingForm";
import CardITB from "../components/CardITB";

export default function Home() {
  return (
    <>
      <Navbar />
      <hr />
      <BookingForm />
      <main>
        <img
          src=""
          className="img-fluid rounded mb-5"
          alt="Foto del hotel Teshuva"
          style={{ height: "600px", width: "100%", objectFit: "cover" }}
        />
        <hr />
        <h1 className="text-center">Hotel Teshuvá</h1>
        <hr />
        {/*Información general del hotel.*/}
        <section className="container p-0 my-5">
          <div className="row gx-4">
            <div className="col">
              <CardITB image="" title="Hotel Teshuvá" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
