import { useState } from "react";

// Custom hook para manejar el estado de las rutas
export const useRuta = (
  rutas
  // clientes,
  // setClientesDisponibles,
  // setClientesSalidaRuta,
  // setRepartidor,
  // setDesabilitarContinuar
) => {
  // Estado de la ruta
  const [ruta, setRuta] = useState({});

  // Funcion para separar los clientes de la ruta de los disponibles para ser seleccionados
  // const separarClientes = (clientesIniciales, ruta) => {
  //   const clientesDisponibles = clientesIniciales.filter(
  //     (cliente) => !ruta.cliente_id.includes(cliente.id)
  //   );
  //   const clientesSalidaRuta = clientesIniciales.filter((cliente) =>
  //     ruta.cliente_id.includes(cliente.id)
  //   );

  //   const clientesSalidaRutaConfirmados = clientesSalidaRuta.map((c) => {
  //     c.confirmado = true;
  //     return c;
  //   });
  //   return [clientesDisponibles, clientesSalidaRutaConfirmados];
  // };

  const manejarCambiarRuta = (rutaId) => {
    const rutaSeleccionada = { ...rutas.find((r) => r.id === rutaId) };
    setRuta(rutaSeleccionada);

    // const [clientesDisponiblesIniciales, clientesSalidaRutaIniciales] =
    //   separarClientes(clientes, rutaSeleccionada);
    //   setRuta(rutaSeleccionada);
    // // Seleccionar el repartidor de la ruta
    //   setRepartidor(rutaSeleccionada.REPARTIDOR);
    //   setClientesDisponibles(clientesDisponiblesIniciales);
    //   setClientesSalidaRuta(clientesSalidaRutaIniciales);
    //   setDesabilitarContinuar(false);
  };

  return {
    ruta,
    manejarCambiarRuta,
  };
};
