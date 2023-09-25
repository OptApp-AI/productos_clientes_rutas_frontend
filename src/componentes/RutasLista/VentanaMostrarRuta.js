import React from "react";
// Estilos del componente
import {
  StyledModal,
  StyledModalBody,
  StyledModalHeader,
  StyledModalFooter,
  StyledButton,
} from "./styles/VentanaMostrarRuta.styles";

const VentanaMostrarRuta = ({ ruta, mostrarRuta, manejarCerrarVentana }) => {
  return (
    ruta && (
      <StyledModal centered show={mostrarRuta} onHide={manejarCerrarVentana}>
        <StyledModalHeader>
          <h4>Detalles de la ruta #{ruta.id}</h4>
        </StyledModalHeader>

        <StyledModalBody>
          <h5>Datos de la ruta</h5>
          <p>
            <strong>Nombre:</strong> {ruta.NOMBRE}
          </p>

          <p>
            <strong>Repartidor:</strong> {ruta.REPARTIDOR_NOMBRE}
          </p>
        </StyledModalBody>

        <StyledModalFooter>
          <StyledButton
            onClick={() => {
              manejarCerrarVentana();
            }}
          >
            Cerrar
          </StyledButton>
        </StyledModalFooter>
      </StyledModal>
    )
  );
};

export default VentanaMostrarRuta;
