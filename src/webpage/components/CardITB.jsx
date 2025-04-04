import { Link } from "react-router-dom";
import Button from "./Button";

export default function CardITB({ image, title }) {
  return (
    <>
      <div className="card border-0">
        <img
          src={image}
          alt={title}
          className="card-img-top card-img-vertical rounded"
        />
        <div className="card-body px-0">
          <h5 className="card-title">{title}</h5>
          <Link to="/" className="">
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
