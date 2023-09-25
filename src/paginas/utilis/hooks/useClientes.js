import { useState } from "react";

export const DAY_WEEK = [
  "DOMINGO",
  "LUNES",
  "MARTES",
  "MIERCOLES",
  "JUEVES",
  "VIERNES",
  "SABADO",
];

const currentDate = new Date();
const currentDayIndex = currentDate.getDay();
const currentDayName = DAY_WEEK[currentDayIndex];

// Custom Hook para manejar el estado de la salidaRuta
export const useSalidaRuta = (clientes, rutas, usuarios) => {
  // Hook para manejar el estado de la salidaRuta
  const [salidaRuta, setSalidaRuta] = useState({
    rutaDayId: "",
    rutaNombre: "",
    rutaDay: currentDayName,
    clientes: [],
    repartidorId: "",
    observaciones: "",
  });

  // Hook para manejar el estado de los clientes disponibles para ser seleccionados
  const [clientesFormulario, setClientesFormulario] = useState([]);

  // Cuando se cambia el dia o el nombre de la ruta, todos los campos de la ruta y los productos del formulario se modifican
  const manejarModificarSalidaRuta = (nombre, day) => {
    if (!nombre) {
      setSalidaRuta({
        rutaDayId: "",
        rutaNombre: "",
        rutaDay: currentDayName,
        clientes: [],
        repartidorId: "",
      });

      return;
    }

    // Obtener rutaDiaId y repartidor
    const { rutaDiaId, repartidorId } =
      findRutaDiaIdAndRepartidorIdByNombreAndDia(nombre, day, rutas);

    // Obtener clientes de la ruta y clientes disponibles
    const [clientesSalidaRuta, clientesDisponibles] = filterClientesByRutaDiaId(
      clientes,
      rutaDiaId
    );

    // Establecer clientes del formulario
    setClientesFormulario(clientesDisponibles);

    // Establecer ruta
    setSalidaRuta({
      rutaDiaId,
      rutaNombre: nombre,
      rutaDay: day,
      clientes: clientesSalidaRuta,
      repartidorId,
    });
  };

  const manejarModificarRepartidor = (newRepartidorId) => {
    const newRepartidor = findUsuarioById(newRepartidorId, usuarios);
    setSalidaRuta((prevSalidaRuta) => ({
      ...prevSalidaRuta,
      repartidorId: newRepartidor.id,
    }));
  };

  // Cuando solo se cambia el cliente
  const manejarAgregarClienteSalidaRuta = (newCliente) => {
    const newClientes = [...salidaRuta.clientes, newCliente];

    setSalidaRuta((prevSalidaRuta) => ({
      ...prevSalidaRuta,
      clientes: newClientes,
    }));
  };

  const manejarRemoverClienteSalidaRuta = (clienteId) => {
    const newClientes = salidaRuta.clientes.filter(
      (cliente) => cliente.id !== clienteId
    );

    setSalidaRuta((prevSalidaRuta) => ({
      ...prevSalidaRuta,
      clientes: newClientes,
    }));
  };

  // const [desabilitarContinuar, setDesabilitarContinuar] = useState(true);

  // Funcion para desabilitar el boton para continuar con la salida a ruta
  //   const manejarDesabilitarContinuar = (nuevosClientesSalidaRuta) => {
  //   setDesabilitarContinuar(
  //     !(
  //       nuevosClientesSalidaRuta.length > 0 &&
  //       nuevosClientesSalidaRuta.every((p) => p.confirmado)
  //     )
  //   );

  // Funcion para seleccionar el cliente
  const manejarSeleccionarCliente = (clienteId) => {
    // Cliente seleccionado
    const clienteSeleccionado = clientesFormulario.find(
      (c) => c.id === clienteId
    );

    const clienteActualizado = { ...clienteSeleccionado, confirmado: false };

    // Crear la nueva lista de clientes disponibles
    const nuevosClientesDisponibles = clientesFormulario.filter(
      (c) => c.id !== clienteId
    );
    // Actualizar el estado de clientes disponibles
    setClientesFormulario(nuevosClientesDisponibles);

    manejarAgregarClienteSalidaRuta(clienteActualizado);

    // manejarDesabilitarContinuar(nuevosClientesSalidaRuta);
  };

  // Funcion para modificar status del cliente de la lista de clientes de salida a ruta
  const manejarModificarStatusCliente = (clienteId) => {
    const newClientes = salidaRuta.clientes.map((c) => {
      if (c.id === clienteId) {
        c.confirmado = !c.confirmado;
      }

      return c;
    });

    setSalidaRuta((prevSalidaRuta) => ({
      ...prevSalidaRuta,
      clientes: newClientes,
    }));

    // manejarDesabilitarContinuar(nuevosClientesSalidaRuta);
  };

  // Funcion para cancelar el cliente de la lista de clientes seleccionados
  const manejarCancelarCliente = (clienteId) => {
    // Encontrar el cliente a remover de salida ruta
    const clienteSeleccionado = {
      ...salidaRuta.clientes.find((c) => c.id === clienteId),
    };

    // Remover el cliente de salida ruta
    manejarRemoverClienteSalidaRuta(clienteId);

    // Agregar el cliente al formulario
    const nuevosClientesDisponibles = [
      clienteSeleccionado,
      ...clientesFormulario,
    ];
    setClientesFormulario(nuevosClientesDisponibles);
  };

  const manejarModificarObservaciones = (newObservaciones) => {
    setSalidaRuta((prevSalidaRuta) => ({
      ...prevSalidaRuta,
      observaciones: newObservaciones,
    }));
  };

  return {
    // Salida ruta
    salidaRuta,
    manejarModificarSalidaRuta,

    // Repartidor
    manejarModificarRepartidor,

    // Clientes
    clientesFormulario,
    manejarSeleccionarCliente,
    manejarCancelarCliente,
    manejarModificarStatusCliente,

    // Otros
    manejarModificarObservaciones,
  };
};

function filterClientesByRutaDiaId(clientes, ruta_dia_id) {
  const clientesSalidaRuta = clientes.filter((cliente) =>
    cliente.ruta_dia_ids.includes(ruta_dia_id)
  );
  const clientesDisponibles = clientes.filter(
    (cliente) => !cliente.ruta_dia_ids.includes(ruta_dia_id)
  );

  return [clientesSalidaRuta, clientesDisponibles];
}

function findRutaDiaIdAndRepartidorIdByNombreAndDia(NOMBRE, DIA, routes) {
  const route = routes.find((route) => route.NOMBRE === NOMBRE);

  if (!route) {
    return null; // Return null if the NOMBRE is not found
  }

  const rutaDia = route.ruta_dias.find((ruta) => ruta.DIA === DIA);

  if (!rutaDia) {
    return null; // Return null if the DIA is not found
  }

  return { rutaDiaId: rutaDia.id, repartidorId: rutaDia.repartidor_id }; // Return the id for the given DIA
}

const findUsuarioById = (userId, usuarios) => {
  return usuarios.find((usuario) => usuario.id === userId);
};
