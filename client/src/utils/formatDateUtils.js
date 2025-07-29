export const formatToLocalDate = (dateStr) => {
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr));
};

export const formatDateForInput = (isoString) => {
  if (!isoString) return "";
  return new Date(isoString).toISOString().split("T")[0]; // Solo yyyy-MM-dd
};
