import { Button } from "react-bootstrap";
import styled, {css} from 'styled-components';

export const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 0;

  & p {
    color: var(--white-color);
  }
`;

export const StyledCol = styled.div`
  display: flex;
  gap: 30px;
  justify-content: space-evenly;
`;


// Colores del boton
const colorStyles = ({ color }) => {
  switch(color){
    case 'red':
      return css`
        background-color: var(--active-red-button);
        box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
        
        &:hover {
          background-color: var(--hover-red-button);
          box-shadow: 0px 2px 5px 2px rgba(var(--hover-red-button), 0.8);       
          color: var(--white-color);
        }

        &:disabled {
          background-color: var(--disabled-red-button);
        }
      `
    
    case 'green':
      return css`
      background-color: var(--active-green-button);
      box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
      
      &:hover {
        background-color: var(--hover-green-button);
        box-shadow: 0px 2px 5px 2px rgba(var(--hover-green-button), 0.8);
        color: var(--white-color);
      }

      &:disabled {
        background-color: var(--disabled-green-button);
      }
    `
    case 'blue':
      return css`
      background-color: var(--active-blue-button);
      box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
      
      &:hover {
        background-color: var(--hover-blue-button);
        box-shadow: 0px 2px 5px 2px rgba(var(--hover-blue-button), 0.8);
        color: var(--white-color);
      }

      &:disabled {
        background-color: var(--disabled-blue-button);
      }
    `
  }
};

export const StyledButton = styled(Button)`
  color: var(--white-color);
  font-weight: bold;
  ${colorStyles}
`;

