import React, { useEffect } from "react";
// Estilos del componente
import {
  StyledModal,
  StyledModalBody,
  StyledModalHeader,
  StyledModalFooter,
  StyledButton,
} from "./styles/VentanaMostrarRuta.styles";
import { useDispatch, useSelector } from "react-redux";
import { obtenerClientesRutaDia } from "../../actions/rutaActions";

const VentanaMostrarRutaDias = ({
  ruta,
  mostrarRuta,
  manejarCerrarVentana,
}) => {
  const dispatch = useDispatch();
  const clientesRutaDia = useSelector((state) => state.clientesRutaDia);

  const { clientesRuta } = clientesRutaDia;

  useEffect(() => {
    dispatch(obtenerClientesRutaDia(ruta.id));
  }, [ruta.id, dispatch]);

  return (
    ruta && (
      <StyledModal centered show={mostrarRuta} onHide={manejarCerrarVentana}>
        <StyledModalHeader>
          <h4>Detalles de la ruta #{ruta.id}</h4>
        </StyledModalHeader>

        <StyledModalBody>
          <h5>Datos de la ruta</h5>
          <p>
            <strong>Nombre:</strong> {ruta.RUTA.NOMBRE}
          </p>
          <p>
            <strong>Dia:</strong> {ruta.DIA}
          </p>

          <p>
            <strong>Repartidor:</strong> {ruta.REPARTIDOR_NOMBRE}
          </p>

          <h5>Clientes de la ruta</h5>

          {clientesRuta &&
            clientesRuta.map((nombre, index) => <p key={index}>{nombre}</p>)}
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

export default VentanaMostrarRutaDias;
