import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";

import { obtenerSalidaRutaDetalles } from "../actions/salidaRutaActions";
import {
  RESET_SALIDA_RUTA_DETALLES,
  RESET_SALIDA_RUTA_VENTA,
} from "../constantes/salidaRutaConstantes";

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
    // dispatch(
    //   actualizarVenta({
    //     // El id es para el endpoint, no como informacion de actualizacion
    //     id: ventaId,
    //     STATUS: status,
    //   })
    // );
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
  return loading ? (
    <Loader />
  ) : error ? (
    <Mensaje variant="danger">{error}</Mensaje>
  ) : (
    salidaRuta && (
      <div style={{ padding: "25px", width: "100%" }}>
        {/* {loadingSRVenta && <Loader />} */}
        {/* {errorSRVenta && <Mensaje variant="danger">{errorSRVenta}</Mensaje>} */}
        {/* Esta es la parte que cambia en las paginas */}
        <h1>Salida Ruta #{salidaRutaId}</h1>
        <Button variant="primary" onClick={manejarRegresar}>
          Regresar
        </Button>
        <Form onSubmit={manejarActualizarSalidaRuta}>
          <Form.Group controlId="status">
            <Form.Label>STATUS</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="PENDIENTE">Pendiente</option>
              <option value="CANCELADO">Cancelado</option>
            </Form.Control>
          </Form.Group>
          <Button type="submit">Actualizar salida ruta</Button>
        </Form>
        {/* {mostrarReporte && (
          <VentanaMostrarVentaActualizar
            reporteActualizar={reporteActualizar}
            mostrarReporte={mostrarReporte}
            manejarCerrarVentana={manejarCerrarVentana}
          />
        )} */}
      </div>
    )
  );
};

export default SalidaRutaDetalles;
