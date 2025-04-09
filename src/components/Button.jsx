export default function Button(props) {
  // This is a simple button component that takes a name prop and renders a button with that name
  return (
    <button
      type={`${props.btnType}`}
      className={`btn ${props.btnCustom} ${props.btnText} ${props.paddingBtn} ${props.marginBtn} ${props.btnSize}`}
    >
      {props.name}
    </button>
  );
}
