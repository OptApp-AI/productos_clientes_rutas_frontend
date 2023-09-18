import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pedirClientesLista } from "../actions/clienteActions";
// import { registrarSalidaRuta } from "../actions/salidaRutaActions";
import Loader from "../componentes/general/Loader";
import Mensaje from "../componentes/general/Mensaje";
// import VentanaMostrarSalidaRuta from "../componentes/VentanaMostrarSalidaRuta";
// import { RESET_SALIDA_RUTA_REGISTRAR } from "../constantes/salidaRutaConstantes";
import jwt_decode from "jwt-decode";
import { pedirRutasLista } from "../actions/rutaActions";
import FormularioClienteSalidaRuta from "../componentes/SalidaRuta/FormularioClienteSalidaRuta";

// Importar los estilos de la pagina
import { Form } from 'react-bootstrap'
import { 
  StyledContainer,
  StyledCol,
  StyledRow,
  StyledFormGroup,
  StyledButton
 } from './styles/RealizarSalidaRutaClientes.styles';

 // Importar los custom hooks
 import { useClientes, useRuta } from './utilis/RealizarSalidaRutaClientes.utilis'

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
  return (
      <StyledContainer fluid>

        <h1>Realizar Salida Ruta</h1>

        <StyledRow>

          <StyledCol>
            <Form onSubmit={manejarContinuar}>
              <StyledFormGroup controlId="atiende">
                <Form.Label>ATIENDE</Form.Label>
                <Form.Control
                  readOnly
                  type="text"
                  value={atiende}
                ></Form.Control>
              </StyledFormGroup>

              <StyledFormGroup controlId="ruta">
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
              </StyledFormGroup>

              <StyledFormGroup controlId="clientesDisponibles">
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
              </StyledFormGroup>

              <StyledFormGroup controlId="repartidor">
                <Form.Label>REPARTIDOR</Form.Label>
                <Form.Control
                  type="text"
                  value={repartidor}
                  onChange={(e) => setRepartidor(e.target.value)}
                ></Form.Control>
              </StyledFormGroup>

              <StyledFormGroup controlId="observaciones">
                <Form.Label>OBSERVACIONES</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                ></Form.Control>
              </StyledFormGroup>

              <StyledFormGroup>
                <StyledButton disabled={desabilitarContinuar} type="submit">
                  Seleccionar productos
                </StyledButton>
              </StyledFormGroup>
          </Form>
          </StyledCol>

          <StyledCol clientes>
              {clientesSalidaRuta.map((c) => (
                <FormularioClienteSalidaRuta
                  key={c.id}
                  cliente={c}
                  manejarConfirmarCliente={manejarConfirmarCliente}
                  manejarCancelarCliente={manejarCancelarCliente}
                />
              ))}
          </StyledCol>

        </StyledRow>

      </StyledContainer>
    )
};

export default RealizarSalidaRutaClientes;
