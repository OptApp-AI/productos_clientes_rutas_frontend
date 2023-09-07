import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pedirSalidaRutasLista } from "../actions/salidaRutaActions";

import Loader from "../componentes/general/Loader";
import Mensaje from "../componentes/general/Mensaje";
import VentanaMostrarSalidaRuta from "../componentes/VentanaMostrarSalidaRuta";
import {
  RESET_SALIDA_RUTA_DETALLES,
  RESET_SALIDA_RUTA_VENTA,
} from "../constantes/salidaRutaConstantes";
import { formatearFecha } from "../utilitis";

const SalidaRutaLista = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Funcion para nevagar en la aplicacion
  const navigate = useNavigate();
  // Obtener el estado desde el Redux store
  const salidaRutaLista = useSelector((state) => state.salidaRutaLista);
  const { loading, salidaRutas, error } = salidaRutaLista;

  const [mostrarSalidaRuta, setMostrarSalidaRuta] = useState(false);
  const [salidaRuta, setSalidaRuta] = useState({});

  useEffect(() => {
    // Si no hay salidaRutas, disparar la accion de pedir salidaRutas
    if (!salidaRutas) {
      dispatch(pedirSalidaRutasLista());
    }
  }, [dispatch, salidaRutas]);

  const manejarSalidaRutaDetalles = (id) => {
    // Redireccionar a la pagina de la salidaRuta
    dispatch({ type: RESET_SALIDA_RUTA_DETALLES });
    navigate(`/salida-rutas/${id}`);
  };

  const manejarCerrarVentana = () => {
    setMostrarSalidaRuta(false);
  };

  const manejarMostrarDetallesSalidaRuta = (salidaRutaId) => {
    const salidaRutaSeleccionada = salidaRutas.find(
      (v) => v.id === salidaRutaId
    );
    setSalidaRuta(salidaRutaSeleccionada);
    setMostrarSalidaRuta(true);
  };

  const manejarSalidaRutaVenta = (e, salidaRutaId) => {
    e.stopPropagation();
    // alert(salidaRutaId);
    // dispatch({ type: RESET_SALIDA_RUTA_VENTA });
    navigate(`/venta-salida-ruta/${salidaRutaId}`);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Mensaje variant="danger">{error}</Mensaje>
  ) : (
    salidaRutas && (
      <div style={{ padding: "25px" }}>
        {/* Esta el la parte que cambia en las paginas */}
        <h1>Salida Rutas</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>ATIENDE</th>
              <th>REPARTIDOR</th>
              <th>FECHA</th>
              <th>STATUS</th>
              <th>EDITAR</th>
              <th>DEVOLUCION</th>
              <th>VENTA</th>
              <th>AVISO DE VISITA</th>
              <th>RESUMEN/CORTE</th>
            </tr>
          </thead>
          <tbody>
            {salidaRutas.map((sr) => (
              <tr
                key={sr.id}
                onClick={() => manejarMostrarDetallesSalidaRuta(sr.id)}
              >
                <td>{sr.id}</td>
                <td>{sr.ATIENDE}</td>
                <td>{sr.REPARTIDOR}</td>
                <td>{formatearFecha(sr.FECHA)}</td>
                <td>{sr.STATUS}</td>
                <td>
                  <Button onClick={() => manejarSalidaRutaDetalles(sr.id)}>
                    <i className="fa-solid fa-circle-info"></i>
                  </Button>
                </td>
                <td>
                  <Button onClick={() => manejarSalidaRutaDetalles(sr.id)}>
                    <i className="fa-solid fa-rotate-left"></i>
                  </Button>
                </td>

                <td>
                  <Button onClick={(e) => manejarSalidaRutaVenta(e, sr.id)}>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </Button>
                </td>
                <td>
                  <Button onClick={(e) => manejarSalidaRutaVenta(e, sr.id)}>
                    <i className="fa-solid fa-file-signature"></i>
                  </Button>
                </td>
                <td>
                  <Button onClick={(e) => manejarSalidaRutaVenta(e, sr.id)}>
                    <i class="fa-solid fa-receipt"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Mostrar venta */}
        {mostrarSalidaRuta && (
          <VentanaMostrarSalidaRuta
            salidaRuta={salidaRuta}
            mostrarSalidaRuta={mostrarSalidaRuta}
            manejarCerrarVentana={manejarCerrarVentana}
          />
        )}
      </div>
    )
  );
};

export default SalidaRutaLista;
