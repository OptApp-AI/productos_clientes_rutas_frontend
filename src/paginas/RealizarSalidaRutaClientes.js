import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pedirClientesLista } from "../actions/clienteActions";
// import { registrarSalidaRuta } from "../actions/salidaRutaActions";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";
// import VentanaMostrarSalidaRuta from "../componentes/VentanaMostrarSalidaRuta";
// import { RESET_SALIDA_RUTA_REGISTRAR } from "../constantes/salidaRutaConstantes";
import jwt_decode from "jwt-decode";
import { pedirRutasLista } from "../actions/rutaActions";
import FormularioClienteSalidaRuta from "../componentes/FormularioClienteSalidaRuta";

const RealizarSalidaRutaClientes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pedir estado de usuario
  const usuarioInfo = useSelector((state) => state.usuarioInfo);
  const { tokens } = usuarioInfo;

  // Pedir estado de clientes
  const clienteLista = useSelector((state) => state.clienteLista);
  const {
    loading: loadingClientes,
    clientes,
    error: errorClientes,
  } = clienteLista;

  // Pedir estado de rutas
  const rutaLista = useSelector((state) => state.rutaLista);
  const { loading: loadingRutas, rutas, error: errorRutas } = rutaLista;

  // Campos de SalidaRuta
  const [atiende, setAtiende] = useState("");
  const [repartidor, setRepartidor] = useState("");
  const [desabilitarContinuar, setDesabilitarContinuar] = useState(true);

  const [observaciones, setObservaciones] = useState("NO APLICA");

  useEffect(() => {
    if (!tokens) {
      navigate("/login");
      return;
    } else {
      // Obtener el username a partir del token
      const decoded = jwt_decode(tokens.access);
      setAtiende(decoded.username);
    }

    if (!rutas) {
      dispatch(pedirRutasLista());
    }

    if (!clientes) {
      dispatch(pedirClientesLista());
    }
  }, [clientes, navigate, rutas, dispatch, tokens]);

  const {
    clientesDisponibles,
    clientesSalidaRuta,
    setClientesDisponibles,
    setClientesSalidaRuta,
    manejarSeleccionarCliente,
    manejarConfirmarCliente,
    manejarCancelarCliente,
  } = useClientes(setDesabilitarContinuar);

  const { ruta, manejarCambiarRuta } = useRuta(
    rutas,
    clientes,
    setClientesDisponibles,
    setClientesSalidaRuta,
    setRepartidor,
    setDesabilitarContinuar
  );

  const manejarContinuar = (e) => {
    e.preventDefault();
    alert("Vamos a seleccionar los productos!");

    const salidaRuta = {
      ATIENDE: atiende,
      REPARTIDOR: repartidor,
      OBSERVACIONES: observaciones,
      RUTA: ruta.id,
      salidaRutaClientes: clientesSalidaRuta.map((c) => {
        return { clienteId: c.id };
      }),
    };

    localStorage.setItem("salidaRuta", JSON.stringify(salidaRuta));
    navigate("/realizar-salida-ruta/productos");
  };
  return loadingClientes || loadingRutas ? (
    <Loader />
  ) : errorClientes || errorRutas ? (
    <Mensaje variant="danger">{errorClientes}</Mensaje>
  ) : (
    clientes &&
    rutas && (
      <div style={{ padding: "25px", width: "100%" }}>
        {/* {loadingRegistrar && <Loader />} */}
        {/* {errorRegistrar && <Mensaje variant="danger">{errorRegistrar}</Mensaje>} */}
        {/* Esta es la parte que cambia en las paginas */}
        <h1>Realizar Salida Ruta</h1>
        <Form onSubmit={manejarContinuar}>
          <Row>
            <Col md={5}>
              <Form.Group controlId="atiende">
                <Form.Label>ATIENDE</Form.Label>
                <Form.Control
                  readOnly
                  type="text"
                  value={atiende}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="ruta">
                <Form.Label>RUTA</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={0}
                  // value={ruta.id}
                  onChange={(e) => manejarCambiarRuta(Number(e.target.value))}
                >
                  <option value={0}>Seleccione una ruta</option>
                  {rutas.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.NOMBRE}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="clientesDisponibles">
                <Form.Label>CLIENTES DISPONIBLES</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={0}
                  onChange={(e) =>
                    manejarSeleccionarCliente(Number(e.target.value))
                  }
                >
                  <option value={0}>Selecciona un cliente</option>
                  {clientesDisponibles.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.NOMBRE}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="repartidor">
                <Form.Label>REPARTIDOR</Form.Label>
                <Form.Control
                  type="text"
                  value={repartidor}
                  onChange={(e) => setRepartidor(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="observaciones">
                <Form.Label>OBSERVACIONES</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button disabled={desabilitarContinuar} type="submit">
                Seleccionar productos
              </Button>
            </Col>
            <Col md={7}>
              {clientesSalidaRuta.map((c) => (
                <FormularioClienteSalidaRuta
                  key={c.id}
                  cliente={c}
                  manejarConfirmarCliente={manejarConfirmarCliente}
                  manejarCancelarCliente={manejarCancelarCliente}
                />
              ))}
            </Col>
          </Row>
        </Form>
      </div>
    )
  );
};

const useClientes = (setDesabilitarContinuar) => {
  const [clientesDisponibles, setClientesDisponibles] = useState([]);
  const [clientesSalidaRuta, setClientesSalidaRuta] = useState([]);

  const manejarDesabilitarContinuar = (nuevosClientesSalidaRuta) => {
    setDesabilitarContinuar(
      !(
        nuevosClientesSalidaRuta.length > 0 &&
        nuevosClientesSalidaRuta.every((p) => p.confirmado)
      )
    );
  };

  const manejarSeleccionarCliente = (clienteId) => {
    const clienteSeleccionado = clientesDisponibles.find(
      (c) => c.id === clienteId
    );

    const clienteActualizado = { ...clienteSeleccionado, confirmado: false };

    const nuevosClientesDisponibles = clientesDisponibles.filter(
      (c) => c.id !== clienteId
    );

    setClientesDisponibles(nuevosClientesDisponibles);

    const nuevosClientesSalidaRuta = [
      clienteActualizado,
      ...clientesSalidaRuta,
    ];

    setClientesSalidaRuta(nuevosClientesSalidaRuta);

    manejarDesabilitarContinuar(nuevosClientesSalidaRuta);
  };

  const manejarConfirmarCliente = (clienteId) => {
    const nuevosClientesSalidaRuta = clientesSalidaRuta.map((c) => {
      if (c.id === clienteId) {
        c.confirmado = !c.confirmado;
      }
      return c;
    });

    setClientesSalidaRuta(nuevosClientesSalidaRuta);

    manejarDesabilitarContinuar(nuevosClientesSalidaRuta);
  };

  const manejarCancelarCliente = (clienteId) => {
    const clienteSeleccionado = {
      ...clientesSalidaRuta.find((c) => c.id === clienteId),
    };

    const nuevosClientesSalidaRuta = clientesSalidaRuta.filter(
      (c) => c.id !== clienteId
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

const useRuta = (
  rutas,
  clientes,
  setClientesDisponibles,
  setClientesSalidaRuta,
  setRepartidor,
  setDesabilitarContinuar
) => {
  const [ruta, setRuta] = useState({});

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

export default RealizarSalidaRutaClientes;
