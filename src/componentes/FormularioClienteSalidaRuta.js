import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const FormularioClienteSalidaRuta = ({
  cliente,
  manejarConfirmarCliente,
  manejarCancelarCliente,
}) => {
  return (
    <Row>
      <p>
        ID: {cliente.id} | NOMBRE: {cliente.NOMBRE} | RUTA:{" "}
        {cliente.ruta_nombre}
      </p>

      <Col md={3}>
        <Button
          disabled={cliente.confirmado}
          onClick={() => manejarConfirmarCliente(cliente.id)}
        >
          Confirmar
        </Button>
      </Col>
      <Col md={3}>
        <Button
          disabled={!cliente.confirmado}
          onClick={() => manejarConfirmarCliente(cliente.id)}
        >
          Modificar
        </Button>
      </Col>
      <Col md={3}>
        <Button onClick={() => manejarCancelarCliente(cliente.id)}>
          Cancelar
        </Button>
      </Col>
    </Row>
  );
};

export default FormularioClienteSalidaRuta;
