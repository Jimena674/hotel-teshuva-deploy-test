export default function AlertMessage({ message, type }) {
  if (!message) {
    return null;
  }
  const alertClass = type === "success" ? "alert-success" : "alert-danger";
  return (
    <div className={`alert ${alertClass} py-2`} role="alert">
      {message}
    </div>
  );
}
