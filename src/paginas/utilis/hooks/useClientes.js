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

// Custom Hook para manejar el estado de los clientes de la salida a ruta
export const useFiltros = (clientes, rutas, usuarios) => {
  // Hook para manejar el estado de los clientes disponibles para ser seleccionados
  const [clientesFormulario, setClientesFormulario] = useState([]);
  // Hook para manejar el estado de los clientes que ya estan en la ruta
  // const [clientesSalidaRuta, setClientesSalidaRuta] = useState([]);

  // Hook para manejar el estado de la ruta
  const [salidaRuta, setSalidaRuta] = useState({
    rutaDayId: "",
    rutaNombre: "",
    rutaDay: currentDayName,
    clientes: [],
    repartidor: "",
  });

  // Cuando se cambia el dia o el nombre de la ruta, todos los campos de la ruta y los productos del formulario se modifican
  const manejarModificarSalidaRuta = (nombre, day) => {
    // Obtener rutaDiaId y repartidor
    const { rutaDiaId, repartidor } = findRutaDiaIdByNombreAndDia(
      nombre,
      day,
      rutas
    );
    // Onbtener clientes de la ruta y clientes disponibles
    const [clientesSalidaRuta, clientesDisponibles] = filterClientesByRutaDiaId(
      clientes,
      salidaRuta.rutaDiaId
    );

    // Establecer clientes del formulario
    setClientesFormulario(clientesDisponibles);

    // Establecer ruta
    setSalidaRuta({
      rutaDiaId,
      rutaNombre: nombre,
      rutaDay: day,
      clientes: clientesSalidaRuta,
      repartidor,
    });
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

  // Hook para manejar campos adicionales para generar salida ruta
  // const [repartidor, setRepartidor] = useState("");
  // const [day, setDay] = useState(currentDayName);
  // const [desabilitarContinuar, setDesabilitarContinuar] = useState(true);
  const [observaciones, setObservaciones] = useState("NO APLICA");

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

    // Agregar el cliente seleccionado a los clientes de la salida a ruta
    // const nuevosClientesSalidaRuta = [
    //   ...clientesSalidaRuta,
    //   clienteActualizado,
    // ];
    // // Actualizar el estado de los clientes de la salida a ruta
    // setClientesSalidaRuta(nuevosClientesSalidaRuta);

    // manejarDesabilitarContinuar(nuevosClientesSalidaRuta);
  };

  // Funcion para confirmar el cliente de la lista de clientes de salida a ruta
  const manejarModificarStatusClienteSalidaRuta = (clienteId) => {
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
  const manejarCancelarClienteSalidaRuta = (clienteId) => {
    const clienteSeleccionado = {
      ...salidaRuta.clientes.find((c) => c.id === clienteId),
    };

    // const nuevosClientesSalidaRuta = clientesSalidaRuta.filter(
    //   (c) => c.id !== clienteId
    // );

    // setClientesSalidaRuta(nuevosClientesSalidaRuta);

    manejarRemoverClienteSalidaRuta(clienteId);

    const nuevosClientesDisponibles = [
      clienteSeleccionado,
      ...clientesFormulario,
    ];

    setClientesFormulario(nuevosClientesDisponibles);
  };

  return {
    // Clientes del formulario
    clientesFormulario,
    setClientesFormulario,
    // Salida ruta
    salidaRuta,
    manejarModificarSalidaRuta,
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

function findRutaDiaIdByNombreAndDia(NOMBRE, DIA, routes) {
  const route = routes.find((route) => route.NOMBRE === NOMBRE);

  if (!route) {
    return null; // Return null if the NOMBRE is not found
  }

  const rutaDia = route.ruta_dias.find((ruta) => ruta.DIA === DIA);

  if (!rutaDia) {
    return null; // Return null if the DIA is not found
  }

  return { rutaDiaId: rutaDia.id, repartidor: rutaDia.REPARTIDOR_NOMBRE }; // Return the id for the given DIA
}
