import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';

// Estilos del contenedor principal
export const StyledContainer = styled(Container)`
    height: 100%;
    padding: 5rem 0;

    h1 {
        text-align: center;
        color: var(--white-color);
        margin-bottom: 3rem;
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