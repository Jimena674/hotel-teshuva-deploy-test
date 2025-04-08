export default function TitleWebpage(props) {
  return (
    <>
      <h1 className={`${props.titleFont}`} style={props.color}>
        {props.title}
      </h1>
      <p className={`${props.descriptionFont}`}>{props.description}</p>
    </>
  );
}
