export default function BookingStatusColor({ type }) {
  let backgroudType = "";
  if (type === "Pendiente") {
    backgroudType = "warning";
  } else if (type === "Confirmada") {
    backgroudType = "info";
  } else if (type === "Cancelada") {
    backgroudType = "danger";
  } else if (type === "Completada") {
    backgroudType = "success";
  }
  return <span className={`badge text-bg-${backgroudType}`}>{type}</span>;
}
