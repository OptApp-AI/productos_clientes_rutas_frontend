export const formatearFecha = (fecha) => {
  const date = new Date(fecha);
  return date.toLocaleString();
};
