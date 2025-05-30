export default function CardITDB(props) {
  return (
    <>
      <div className="card border-0">
        <img
          src={props.image}
          alt={props.title}
          className="card-img-top card-img-vertical rounded"
          style={{
            width: props.widthImg,
            height: props.heightImg,
            objectFit: props.objectFitImg,
          }}
        />
        <div className="card-body px-0">
          <h5 className="card-title title-medium mb-3">{props.title}</h5>
          <p className="card-text body-medium">{props.description}</p>
        </div>
      </div>
    </>
  );
}
