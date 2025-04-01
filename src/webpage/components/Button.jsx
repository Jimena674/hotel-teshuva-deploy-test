export default function Button({ name }) {
  // This is a simple button component that takes a name prop and renders a button with that name
  return (
    <button type="button" className="btn">
      {name}
    </button>
  );
}
