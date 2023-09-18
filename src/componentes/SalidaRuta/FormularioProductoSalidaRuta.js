import React from "react";
import { Row, Form } from "react-bootstrap";
import { Container, StyledCol, StyledButton, StyledFormGroup } from './styles/FormularioProductoSalidaRuta.styles'

const FormularioProductoSalidaRuta = ({
  producto,
  manejarCambioCantidad,
  manejarConfirmarProducto,
  manejarCancelarProducto,
}) => {
  return (
    <Container>

      <Row>
        <p>
          NOMBRE: {producto.NOMBRE} | PRECIO:
          {producto.PRECIO} | CANTIDAD DISPONIBLE: {producto.CANTIDAD}
        </p>
      </Row>

      <Row>
       <StyledCol>
        <StyledFormGroup controlId={producto.id}>
          <Form.Control
            disabled={producto.confirmado}
            type="number"
            value={producto.cantidadVenta}
            onChange={(e) =>
              manejarCambioCantidad(Number(e.target.value), producto.id)
            }
          ></Form.Control>
        </StyledFormGroup>

        <StyledButton
          color='green'
          disabled={producto.confirmado}
          onClick={() => manejarConfirmarProducto(producto.id)}
        >
          Confirmar
        </StyledButton>


        <StyledButton
          color='blue'
          disabled={!producto.confirmado}
          onClick={() => manejarConfirmarProducto(producto.id)}
        >
          Modificar
        </StyledButton>


        <StyledButton
          color='red' 
          onClick={() => manejarCancelarProducto(producto.id)}>
          Cancelar
        </StyledButton>
      </StyledCol>
      </Row>
    </Container>
  );
};

export default FormularioProductoSalidaRuta;
