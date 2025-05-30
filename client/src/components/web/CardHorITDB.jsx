import Button from "../common/Button";
import { Link } from "react-router-dom";

export default function CardHorITDB(props) {
  return (
    <div className="card border-0">
      <div className="row g-0">
        <div className="col-12 col-md-6">
          <img
            src={props.image}
            alt={props.title}
            className="img-fluid rounded "
            style={{
              width: props.widthImg,
              height: props.heightImg,
              objectFit: props.objectFitImg,
            }}
          />
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <div className="card-body p-0 ms-md-4">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
            <Link to="/" className="btn p-0">
              <Button
                name="Ver más detalles"
                btnCustom="solid-btn-tertiary"
                btnText="label-small"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
