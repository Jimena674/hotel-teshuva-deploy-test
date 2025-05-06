export default function IconText(props) {
  return (
    <>
      <i className={props.icon} style={{ fontSize: props.iconSize }}></i>
      <span className={`ms-2 ${props.font}`}>{props.description}</span>
    </>
  );
}
