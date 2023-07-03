import React from "react";
import { Button, Modal } from "react-bootstrap";
import { formatearFecha } from "../utilitis";

const VentanaMostrarSalidaRuta = ({
  salidaRuta,
  mostrarSalidaRuta,
  manejarCerrarVentana,
}) => {
  return (
    salidaRuta &&
    salidaRuta.salida_ruta_productos && (
      <Modal show={mostrarSalidaRuta} onHide={manejarCerrarVentana}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de Salida a Ruta #{salidaRuta.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>ATIENDE:</strong> {salidaRuta.ATIENDE}
          </p>
          <p>
            <strong>REPARTIDOR:</strong> {salidaRuta.REPARTIDOR}
          </p>
          <p>
            <strong>FECHA:</strong> {formatearFecha(salidaRuta.FECHA)}
          </p>
          <p>
            <strong>STATUS:</strong> {salidaRuta.STATUS}
          </p>
          <p>
            <strong>OBSERVACIONES:</strong> {salidaRuta.OBSERVACIONES}
          </p>
          <p>
            <strong>PRODUCTOS DE SALIDA RUTA:</strong>
          </p>
          <ol>
            {salidaRuta.salida_ruta_productos.map((ps) => (
              <li key={ps.id}>
                {ps.producto_nombre}:
                <ul>
                  <li>CANTIDAD RUTA: {ps.CANTIDAD_RUTA}</li>
                  <li>CANTIDAD DISPONIBLE: {ps.CANTIDAD_DISPONIBLE}</li>
                  <li>STATUS: {ps.STATUS}</li>
                </ul>
              </li>
            ))}
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={manejarCerrarVentana}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
};

export default VentanaMostrarSalidaRuta;
