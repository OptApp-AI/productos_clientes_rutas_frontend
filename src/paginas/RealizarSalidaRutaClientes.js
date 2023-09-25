import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pedirClientesLista } from "../actions/clienteActions";
// import { registrarSalidaRuta } from "../actions/salidaRutaActions";
import Loader from "../componentes/general/Loader";
import Mensaje from "../componentes/general/Mensaje";
// import VentanaMostrarSalidaRuta from "../componentes/VentanaMostrarSalidaRuta";
// import { RESET_SALIDA_RUTA_REGISTRAR } from "../constantes/salidaRutaConstantes";

import { pedirRutasSalidaRutaLista } from "../actions/rutaActions";
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
import { DAY_WEEK, useSalidaRuta } from "./utilis/hooks/useClientes";
import { pedirUsuariosLista } from "../actions/usuarioActions";

const RealizarSalidaRutaClientes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pedir estado de clientes
  const clienteLista = useSelector((state) => state.clienteLista);
  const { clientes } = clienteLista;

  // Pedir estado de rutas
  const rutaSalidaRutaLista = useSelector((state) => state.rutaSalidaRutaLista);
  const { rutasSalidaRuta } = rutaSalidaRutaLista;

  // Obtener estado de usuarios (el repartidor se escoge de entre los usuarios)
  const usuarioLista = useSelector((state) => state.usuarioLista);
  const { usuarios } = usuarioLista;

  const {
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

    // Observaciones
    manejarModificarObservaciones,

    isDisabled,
  } = useSalidaRuta(clientes, rutasSalidaRuta, usuarios);

  useEffect(() => {
    if (!rutasSalidaRuta) {
      dispatch(pedirRutasSalidaRutaLista());
    }
  }, [rutasSalidaRuta, dispatch]);

  useEffect(() => {
    if (!clientes) {
      dispatch(pedirClientesLista());
    }
  }, [clientes, dispatch]);

  // useEffect para cargar los usuarios
  useEffect(() => {
    if (!usuarios) {
      dispatch(pedirUsuariosLista());
    }
  }, [usuarios, dispatch]);

  //   setDesabilitarContinuar

  const manejarContinuar = (e) => {
    e.preventDefault();

    const salidaRuta_ = {
      ATIENDE: "JOHN",
      rutaId: salidaRuta.rutaDayId,
      DIA: salidaRuta.rutaDay,
      RUTA_NOMBRE: salidaRuta.rutaNombre,
      REPARTIDOR: salidaRuta.repartidorId,
      REPARTIDOR_NOMBRE: getRepartidorName(usuarios, salidaRuta.repartidorId),
      OBSERVACIONES: salidaRuta.observaciones,
      salidaRutaClientes: salidaRuta.clientes.map((c) => {
        return { clienteId: c.id };
      }),
    };

    console.log(salidaRuta_);

    // localStorage.setItem("salidaRuta", JSON.stringify(salidaRuta));
    // navigate("/realizar-salida-ruta-productos");
  };

  return (
    rutasSalidaRuta &&
    usuarios && (
      <StyledContainer fluid>
        <h1>Realizar Salida Ruta</h1>

        <StyledRow>
          <StyledCol>
            <Form onSubmit={manejarContinuar}>
              <StyledFormGroup controlId="ruta">
                <Form.Label>RUTA</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue=""
                  value={salidaRuta.rutaNombre}
                  onChange={(e) => {
                    manejarModificarSalidaRuta(
                      e.target.value,
                      salidaRuta.rutaDay
                    );
                  }}
                >
                  <option value="">Seleccione una ruta</option>
                  {rutasSalidaRuta.map((r) => (
                    <option key={r.id} value={r.NOMBRE}>
                      {r.NOMBRE}
                    </option>
                  ))}
                </Form.Control>
              </StyledFormGroup>

              <StyledFormGroup controlId="day">
                <Form.Label>Días de la semana:</Form.Label>

                <Form.Control
                  as="select"
                  value={salidaRuta.rutaDay}
                  onChange={(e) => {
                    manejarModificarSalidaRuta(
                      salidaRuta.rutaNombre,
                      e.target.value
                    );
                  }}
                  disabled={!salidaRuta.rutaNombre}
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
                  {clientesFormulario.map((c) => (
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
                  defaultValue={0}
                  value={salidaRuta.repartidorId}
                  onChange={(e) => manejarModificarRepartidor(e.target.value)}
                >
                  <option value={0}>Selecciona un repartidor</option>
                  {usuarios.map((usuario) => (
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
                  value={salidaRuta.observaciones}
                  onChange={(e) =>
                    manejarModificarObservaciones(e.target.value)
                  }
                ></Form.Control>
              </StyledFormGroup>

              <StyledFormGroup>
                {/* disabled={desabilitarContinuar} */}
                <StyledButton type="submit">Seleccionar productos</StyledButton>
              </StyledFormGroup>
            </Form>
          </StyledCol>

          <StyledCol>
            {salidaRuta.clientes.map((c) => (
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
