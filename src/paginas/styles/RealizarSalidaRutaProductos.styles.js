import styled from 'styled-components';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

// Contenedor principal
export const StyledContainer = styled(Container)`
  height: 100%;
  padding: 5rem 0;
  
  user-select: none;
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
    color: var(--white-color);
    margin-bottom: 3rem;
  }
`;


// Estilos de las filas
export const StyledRow = styled(Row)`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  gap: 50px;
  padding: 0;
`;

// Estilos de las columnas
export const StyledCol = styled.div`
  max-height: 75vh;
  width: 45%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: ${p => p.productos ? 'flex-start' : 'center'};


  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: end;
  }

  overflow-y: auto;
`;


// Estilos de los campos del formulario
export const StyledFormGroup = styled(Form.Group)`
  width: 400px;

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

  button {
    justify-self: center;
  }
`;

// Estilos del boton
export const StyledButton = styled(Button)`
  max-width: 200px;
  height: 50px;
  margin: 10px 0;
  background-color: var(--active-green-button);
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--hover-green-button);
    box-shadow: 0px 2px 5px 2px rgba(0, 161, 0, 0.8);
    color: var(--white-color);
  }

  &:disabled {
    background-color: var(--disabled-green-button);
  }
`;