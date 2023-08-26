import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';

// Estilos del contenedor principal
export const StyledContainer = styled(Container)`
    height: 100%;
    width: 100%;
    padding: 5rem 0;

    h1 {
        text-align: center;
        color: var(--white-color);
        margin-bottom: 1rem;
    }

`;

// Estilos de las filas
export const StyledRow = styled(Row)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 120rem;
`;

// Estilos de las columnas
export const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
      margin-bottom: 2rem;
    }
`;

// Estilos del formulario
export const StyledFormGroup = styled(Form.Group)`
  width: 50%;
  min-width: 200px;

  label {
    color: var(--font-color-label);
    font-weight: var(--font-weight-label);
    font-size: var(--font-size-label);
  }

  input, 
  select {
    color: var(--font-color-input);
    font-weight: var(--font-weight-input);
    font-size: var(--font-size-input);
    margin-bottom: 2rem;
  }
`;

// Estilos del boton
export const StyledButton = styled(Button)`
  max-width: 200px;
  height: 50px;
  margin: 10px 0;
  background-color: rgba(0, 100, 0, 0.6);
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #00a100;
    box-shadow: 0px 2px 5px 2px rgba(0, 161, 0, 0.8);
    color: black;
  }
`;