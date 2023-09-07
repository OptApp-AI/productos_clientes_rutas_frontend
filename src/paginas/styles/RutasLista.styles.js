import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components'

// Estilos del contenedor principal
export const StyledContainer = styled(Container)`
    height: 100%;
    width: 100%;
    padding: 2rem 0;

    h1 {
        text-align: center;
        color: var(--white-color);
        //margin-bottom: 3rem;
    }
`;

// Estilos de las filas
export const StyledRow = styled(Row)`
    height: 100%;
    width: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    //padding-top: 3rem;
    max-width: 120rem;
`;

// Estilos de las columnas
export const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  //margin-bottom: 2rem;
`;
 