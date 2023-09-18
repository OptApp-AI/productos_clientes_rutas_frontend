import { useEffect, useState } from "react";
import { pedirClientesLista } from "../../actions/clienteActions";
import { pedirRutasLista } from "../../actions/rutaActions";

// Custom Hook para manejar el estado de los clientes de la salida a ruta
export const useClientes = (setDesabilitarContinuar) => {

  // Hook para manejar el estado de los clientes disponibles para ser seleccionados
  const [clientesDisponibles, setClientesDisponibles] = useState([]);
  // Hook para manejar el estado de los clientes que ya estan en la ruta
  const [clientesSalidaRuta, setClientesSalidaRuta] = useState([]);

  // Funcion para desabilitar el boton para continuar con la salida a ruta
  const manejarDesabilitarContinuar = (nuevosClientesSalidaRuta) => {
    setDesabilitarContinuar(
      !(
        nuevosClientesSalidaRuta.length > 0 &&
        nuevosClientesSalidaRuta.every(p => p.confirmado)
      )
    );
  };

  // Funcion para seleccionar el cliente
  const manejarSeleccionarCliente = (clienteId) => {

    // Cliente seleccionado
    const clienteSeleccionado = clientesDisponibles.find(
      c => c.id === clienteId
    );

    const clienteActualizado = { ...clienteSeleccionado, confirmado: false};

    // Crear la nueva lista de clientes disponibles
    const nuevosClientesDisponibles = clientesDisponibles.filter(
      c => c.id !== clienteId
    );
    // Actualizar el estado de clientes disponibles
    setClientesDisponibles(nuevosClientesDisponibles);

    // Agregar el cliente seleccionado a los clientes de la salida a ruta
    const nuevosClientesSalidaRuta = [
      clienteActualizado,
      ...clientesSalidaRuta
    ];
    // Actualizar el estado de los clientes de la salida a ruta
    setClientesSalidaRuta(nuevosClientesSalidaRuta);

    manejarDesabilitarContinuar(nuevosClientesSalidaRuta);
  };

  // Funcion para confirmar el cliente de la lista de clientes de salida a ruta
  const manejarConfirmarCliente = (clienteId) => {
    const nuevosClientesSalidaRuta = clientesSalidaRuta.map(c => {
      if (c.id === clienteId) {
        c.confirmado = !c.confirmado
      }

      return c;
    });

    setClientesSalidaRuta(nuevosClientesSalidaRuta);
    manejarDesabilitarContinuar(nuevosClientesSalidaRuta);
  };

  // Funcion para cancelar el cliente de la lista de clientes seleccionados
  const manejarCancelarCliente = (clienteId) => {
    const clienteSeleccionado = {
      ...clientesSalidaRuta.find(c => c.id === clienteId),
    };

    const nuevosClientesSalidaRuta = clientesSalidaRuta.filter(
      c => c.id !== clienteId
    );

    setClientesSalidaRuta(nuevosClientesSalidaRuta);

    const nuevosClientesDisponibles = [
      clienteSeleccionado,
      ...clientesDisponibles,
    ];

    setClientesDisponibles(nuevosClientesDisponibles);
  };

  return {
    clientesDisponibles,
    clientesSalidaRuta,
    setClientesDisponibles,
    setClientesSalidaRuta,
    manejarSeleccionarCliente,
    manejarConfirmarCliente,
    manejarCancelarCliente,
  };
};

// Custom hook para manejar el estado de las rutas
export const useRuta = (
  rutas,
  clientes,
  setClientesDisponibles,
  setClientesSalidaRuta,
  setRepartidor,
  setDesabilitarContinuar
) => {

  // Estado de la ruta
  const [ruta, setRuta] = useState({});

  // Funcion para separar los clientes de la ruta de los disponibles para ser seleccionados
  const separarClientes = (clientesIniciales, ruta) => {
    const clientesDisponibles = clientesIniciales.filter(
      (cliente) => !ruta.cliente_id.includes(cliente.id)
    );
    const clientesSalidaRuta = clientesIniciales.filter((cliente) =>
      ruta.cliente_id.includes(cliente.id)
    );

    const clientesSalidaRutaConfirmados = clientesSalidaRuta.map((c) => {
      c.confirmado = true;
      return c;
    });
    return [clientesDisponibles, clientesSalidaRutaConfirmados];
  };

  const manejarCambiarRuta = (rutaId) => {
    const rutaSeleccionada = { ...rutas.find((r) => r.id === rutaId) };

    const [clientesDisponiblesIniciales, clientesSalidaRutaIniciales] =
      separarClientes(clientes, rutaSeleccionada);
      setRuta(rutaSeleccionada);
    // Seleccionar el repartidor de la ruta
      setRepartidor(rutaSeleccionada.REPARTIDOR);
      setClientesDisponibles(clientesDisponiblesIniciales);
      setClientesSalidaRuta(clientesSalidaRutaIniciales);
      setDesabilitarContinuar(false);
  };

  return {
    ruta,
    manejarCambiarRuta,
  };
};