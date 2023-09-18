import React from "react";
import { Modal } from "react-bootstrap";
import { formatearFecha } from "../../utilitis";

// Estilos del componente
import { 
	StyledModal,
	StyledModalBody,
	StyledModalHeader,
	StyledModalFooter,
	StyledButton
} from './styles/VentanaMostrarSalidaRuta.styles';

const VentanaMostrarSalidaRuta = ({
  salidaRuta,
  mostrarSalidaRuta,
  manejarCerrarVentana,
}) => {
  return (
    salidaRuta &&
    salidaRuta.salida_ruta_productos && (
      <StyledModal
        scrollable 
        show={mostrarSalidaRuta} 
        onHide={manejarCerrarVentana}>

        <StyledModalHeader closeButton>
          <Modal.Title>Detalles de Salida a Ruta #{salidaRuta.id}</Modal.Title>
        </StyledModalHeader>

        <StyledModalBody>
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

          <p>
            <strong>CLIENTES DE SALIDA RUTA:</strong>
          </p>

          <ol>
            {salidaRuta.salida_ruta_clientes.map((cs) => (
              <li key={cs.id}>
                {cs.nombre}:
                <ul>
                  <li>STATUS: {cs.STATUS}</li>
                </ul>
              </li>
            ))}
          </ol>
        </StyledModalBody>

        <StyledModalFooter>
          <StyledButton variant="secondary" onClick={manejarCerrarVentana}>
            Cerrar
          </StyledButton>
        </StyledModalFooter>

      </StyledModal>
    )
  );
};

export default VentanaMostrarSalidaRuta;
