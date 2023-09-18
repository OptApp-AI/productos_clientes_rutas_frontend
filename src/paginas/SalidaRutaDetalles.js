import React, { useEffect, useState } from "react";
import {  Form, Row, Col, Button  } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../componentes/general/Loader";
import Mensaje from "../componentes/general/Mensaje";

import {
  actualizarSalidaRuta,
  obtenerSalidaRutaDetalles,
} from "../actions/salidaRutaActions";
import {
  RESET_SALIDA_RUTA_DETALLES,
  RESET_SALIDA_RUTA_VENTA,
} from "../constantes/salidaRutaConstantes";

// Estilos de la pagina
import { 
  StyledContainer,
  StyledRow,
  StyledCol,
  StyledButton,
  StyledFormGroup
 } from './styles/SalidaRutaDetalles.styles'

const SalidaRutaDetalles = ({ match }) => {
  const params = useParams(match);

  const salidaRutaId = params.id;

  const salidaRutaDetalles = useSelector((state) => state.salidaRutaDetalles);
  const { error, salidaRuta, loading } = salidaRutaDetalles;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtener el estado desde el Redux store
  // const ventaActualizar = useSelector((state) => state.ventaActualizar);
  // const {
  //   loading: loadingActualizar,
  //   reporte: reporteActualizar,
  //   error: errorActualizar,
  // } = ventaActualizar;

  const [status, setStatus] = useState("");

  const [mostrarReporte, setMostrarReporte] = useState(false);

  useEffect(() => {
    // Si la actualizacion fue correcta, reset productoActualizar y redireccionar a la pagina de productos
    // if (reporteActualizar) {
    //   setMostrarReporte(true);
    // }

    if (!salidaRuta || salidaRuta.id !== Number(salidaRutaId)) {
      dispatch(obtenerSalidaRutaDetalles(salidaRutaId));
    } else if (
      salidaRuta.STATUS === "REALIZADO" ||
      salidaRuta.STATUS === "PROGRESO" ||
      salidaRuta.STATUS === "CANCELADO"
    ) {
      alert("No es posible modificar el STATUS de la salida a ruta");
      navigate("/salida-rutas");
    } else {
      setStatus(salidaRuta.STATUS);
    }
  }, [dispatch, salidaRuta, salidaRutaId, navigate]);

  const manejarActualizarSalidaRuta = (e) => {
    e.preventDefault();
    // Disparar la accion de actualizar producto
    dispatch(
      actualizarSalidaRuta({
        // El id es para el endpoint, no como informacion de actualizacion
        id: salidaRutaId,
        STATUS: status,
      })
    );
  };

  const manejarCerrarVentana = () => {
    setMostrarReporte(false);
    // dispatch({ type: RESET_VENTA_ACTUALIZAR });
    // navigate("/salida-rutas");
  };

  const manejarRegresar = () => {
    dispatch({ type: RESET_SALIDA_RUTA_DETALLES });
    navigate("/salida-rutas");
  };

  if (loading) return <Loader />;

  if (error) return <Mensaje variant="danger">{error}</Mensaje>;

  return (
    salidaRuta && (
      <StyledContainer fluid>

        <StyledRow>
          <StyledCol>

            <h1>Salida Ruta #{salidaRutaId}</h1>
            <StyledButton variant="primary" onClick={manejarRegresar}>
              Regresar
            </StyledButton>

          </StyledCol>
        </StyledRow>
      
        <Form onSubmit={manejarActualizarSalidaRuta}>
          <StyledRow>
            <StyledCol md={6}>

              <StyledFormGroup controlId="status">
                <Form.Label>STATUS</Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="PENDIENTE">Pendiente</option>
                  <option value="CANCELADO">Cancelado</option>
                </Form.Control>
              </StyledFormGroup>

              <StyledButton type="submit">
                Actualizar salida ruta
              </StyledButton>

            </StyledCol>
          </StyledRow>
        </Form>
            {/* {mostrarReporte && (
          <VentanaMostrarVentaActualizar
            reporteActualizar={reporteActualizar}
            mostrarReporte={mostrarReporte}
            manejarCerrarVentana={manejarCerrarVentana}
          />
        )} */}
      </StyledContainer>
    )
  );
};

export default SalidaRutaDetalles;
