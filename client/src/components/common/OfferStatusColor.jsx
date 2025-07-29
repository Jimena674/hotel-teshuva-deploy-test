export default function OfferStatusColor({ type }) {
  let backgroundType = "";
  let statusText = "";
  if (type === 1) {
    backgroundType = "success";
    statusText = "Activa";
  } else if (type === 2) {
    backgroundType = "warning";
    statusText = "Inactiva";
  }
  return (
    <span className={`badge text-bg-${backgroundType}`}>{statusText}</span>
  );
}
