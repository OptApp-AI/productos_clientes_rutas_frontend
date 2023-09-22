import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pedirClientesLista } from "../actions/clienteActions";
// import { registrarSalidaRuta } from "../actions/salidaRutaActions";
import Loader from "../componentes/general/Loader";
import Mensaje from "../componentes/general/Mensaje";
// import VentanaMostrarSalidaRuta from "../componentes/VentanaMostrarSalidaRuta";
// import { RESET_SALIDA_RUTA_REGISTRAR } from "../constantes/salidaRutaConstantes";

import { pedirRutasLista } from "../actions/rutaActions";
import FormularioClienteSalidaRuta from "../componentes/SalidaRuta/FormularioClienteSalidaRuta";

// Importar los estilos de la pagina
import { Form } from "react-bootstrap";
import {
  StyledContainer,
  StyledCol,
  StyledRow,
  StyledFormGroup,
  StyledButton,
} from "./styles/RealizarSalidaRutaClientes.styles";
import { useRuta } from "./utilis/hooks/useRuta";
import { useClientes } from "./utilis/hooks/useClientes";
import { pedirUsuariosLista } from "../actions/usuarioActions";

const DAY_WEEK = [
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

const RealizarSalidaRutaClientes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // Obtener estado del Redux store
  const usuarioLista = useSelector((state) => state.usuarioLista);
  const {
    loading: usuariosLoading,
    usuarios,
    error: usuariosError,
  } = usuarioLista;

  // Campos de SalidaRuta
  const [repartidor, setRepartidor] = useState("");
  const [day, setDay] = useState(currentDayName);
  // const [desabilitarContinuar, setDesabilitarContinuar] = useState(true);
  const [observaciones, setObservaciones] = useState("NO APLICA");

  useEffect(() => {
    if (!rutas) {
      dispatch(pedirRutasLista());
    }
  }, [rutas, dispatch]);

  useEffect(() => {
    if (!clientes) {
      dispatch(pedirClientesLista());
    }
  }, [clientes, dispatch]);

  // useEffect para cargar los usuarios
  useEffect(() => {
    if (!usuarios) {
      dispatch(pedirUsuariosLista());
    } else {
      setRepartidor(usuarios[0].id);
    }
  }, [usuarios, dispatch]);

  const { ruta, manejarCambiarRuta } = useRuta(rutas);

  const {
    clientesDisponibles,
    clientesSalidaRuta,
    manejarSeleccionarCliente,
    manejarCancelarCliente,
    manejarModificarStatusCliente,
  } = useClientes(clientes);

  // const {
  //   clientesDisponibles,
  //   clientesSalidaRuta,
  //   setClientesDisponibles,
  //   setClientesSalidaRuta,
  //   manejarSeleccionarCliente,
  //   manejarConfirmarCliente,
  //   manejarCancelarCliente,
  // } = useClientes(setDesabilitarContinuar);

  // const { ruta, manejarCambiarRuta } = useRuta(
  //   rutas,
  //   clientes,
  //   setClientesDisponibles,
  //   setClientesSalidaRuta,
  //   setRepartidor,
  //   setDesabilitarContinuar
  // );

  const manejarContinuar = (e) => {
    e.preventDefault();

    // const salidaRuta = {
    //   ATIENDE: "",
    //   REPARTIDOR: repartidor,
    //   OBSERVACIONES: observaciones,
    //   RUTA: ruta.id,
    //   salidaRutaClientes: clientesSalidaRuta.map((c) => {
    //     return { clienteId: c.id };
    //   }),
    // };

    const salidaRuta = {
      ATIENDE: "JOHN",
      rutaId: ruta.id,
      DIA: day,
      RUTA_NOMBRE: ruta.NOMBRE,
      REPARTIDOR: repartidor,
      REPARTIDOR_NOMBRE: getRepartidorName(usuarios, repartidor),
      OBSERVACIONES: observaciones,
      salidaRutaClientes: clientesSalidaRuta.map((c) => {
        return { clienteId: c.id };
      }),
    };

    localStorage.setItem("salidaRuta", JSON.stringify(salidaRuta));
    navigate("/realizar-salida-ruta-productos");
  };
  return (
    rutas &&
    clientesDisponibles && (
      <StyledContainer fluid>
        <h1>Realizar Salida Ruta</h1>

        <StyledRow>
          <StyledCol>
            <Form onSubmit={manejarContinuar}>
              <StyledFormGroup controlId="ruta">
                <Form.Label>RUTA</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={0}
                  value={ruta.id}
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

              <StyledFormGroup controlId="day">
                <Form.Label>Días de la semana:</Form.Label>

                <Form.Control
                  as="select"
                  value={day}
                  onChange={(e) => {
                    setDay(e.target.value);
                  }}
                >
                  {DAY_WEEK.map((day) => (
                    <option value={day} key={day}>
                      {day}
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
                  as="select"
                  value={repartidor}
                  onChange={(e) => setRepartidor(e.target.value)}
                >
                  {usuarios &&
                    usuarios.map((usuario) => (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.name}
                      </option>
                    ))}
                </Form.Control>
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
                {/* disabled={desabilitarContinuar} */}
                <StyledButton type="submit">Seleccionar productos</StyledButton>
              </StyledFormGroup>
            </Form>
          </StyledCol>

          <StyledCol>
            <StyledButton type="button" disabled={!ruta.NOMBRE}>
              Cargar clientes de ruta
            </StyledButton>
            {clientesSalidaRuta.map((c) => (
              <FormularioClienteSalidaRuta
                key={c.id}
                cliente={c}
                manejarConfirmarCliente={manejarModificarStatusCliente}
                manejarCancelarCliente={manejarCancelarCliente}
              />
            ))}
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    )
  );
};

export default RealizarSalidaRutaClientes;

const getRepartidorName = (usuarios, repartidor) =>
  usuarios.find((user) => user.id === Number(repartidor)).name;
