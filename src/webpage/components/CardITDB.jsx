import Button from "./Button";
import { Link } from "react-router-dom";

export default function CardITDB(props) {
  return (
    <>
      <div className="card border-0">
        <img
          src={props.image}
          alt={props.title}
          className="card-img-top card-img-vertical rounded"
        />
        <div className="card-body px-0">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
          <Link to="" className="">
            <Button
              name="Ver más detalles"
              btnCustom="navbar-btn"
              btnText="label-medium"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

CardITDB.defaultProps = {
  image: "/images/hotel-standret.jpg",
  title: "Hotel Teshuvá",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a volutpat leo, a laoreet eros. Nulla purus est, euismod ornare tempor vel, lacinia quis mauris.",
};
