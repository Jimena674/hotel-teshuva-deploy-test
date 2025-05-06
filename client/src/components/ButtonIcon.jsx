export default function Button(props) {
  // This is a simple button component that takes a name prop and renders a button with that name
  return (
    <button
      type="button"
      className={`btn ${props.btnCustom} ${props.btnText} ${props.marginBtn} ${props.paddingBtn} ${props.textDecoration}`}
    >
      {props.name}
      <i
        className={`${props.icon} ${props.marginIcon} ${props.paddingIcon}`}
        style={{ fontSize: props.fontSize }}
      ></i>
    </button>
  );
}
