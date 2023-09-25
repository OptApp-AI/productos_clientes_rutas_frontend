import React from "react";
import { Row } from "react-bootstrap";
import {
  Container,
  StyledCol,
  StyledButton,
} from "./styles/FormularioClienteSalidaRuta.styles";

const FormularioClienteSalidaRuta = ({
  cliente,
  manejarConfirmarCliente,
  manejarCancelarCliente,
}) => {
  return (
    <Container>
      <Row>
        {/* <p>
          ID: {cliente.id} | NOMBRE: {cliente.NOMBRE} | RUTA:{" "}
          {cliente.ruta_nombre}
        </p> */}
      </Row>

      <Row>
        <StyledCol>
          <StyledButton
            color="green"
            disabled={cliente.confirmado}
            onClick={() => manejarConfirmarCliente(cliente.id)}
          >
            Confirmar
          </StyledButton>

          <StyledButton
            color="blue"
            disabled={!cliente.confirmado}
            onClick={() => manejarConfirmarCliente(cliente.id)}
          >
            Modificar
          </StyledButton>

          <StyledButton
            color="red"
            onClick={() => manejarCancelarCliente(cliente.id)}
          >
            Cancelar
          </StyledButton>
        </StyledCol>
      </Row>
    </Container>
  );
};

export default FormularioClienteSalidaRuta;
