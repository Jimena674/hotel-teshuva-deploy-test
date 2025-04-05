export default function Button(props) {
  // This is a simple button component that takes a name prop and renders a button with that name
  return (
    <button type="button" className={`btn ${props.btnCustom} ${props.btnText}`}>
      {props.name}
      <i
        className={`ms-2 ${props.icon}`}
        style={{ fontSize: props.fontsize }}
      ></i>
    </button>
  );
}
