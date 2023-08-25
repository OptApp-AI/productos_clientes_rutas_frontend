import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { actualizarRuta, obtenerRutaDetalles } from "../actions/rutaActions";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";
import {
  RESET_RUTA_ACTUALIZAR,
  RESET_RUTA_DETALLES,
} from "../constantes/rutaConstantes";

// Estilos de la pagina
import { 
  StyledContainer
 } from './styles/RutaDetalles.styles'

const RutaDetalles = ({ match }) => {
  // Obtener el id de la ruta
  const params = useParams(match);
  const rutaId = params.id;

  // Funcion para disparar las acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener el estado desde el Redux store
  const rutaDetalles = useSelector((state) => state.rutaDetalles);
  const { loading, ruta, error } = rutaDetalles;

  // Obtener el estado desde el Redux store
  const rutaActualizar = useSelector((state) => state.rutaActualizar);
  const {
    loading: loadingActualizar,
    success: successActualizar,
    error: errorActualizar,
  } = rutaActualizar;

  const [nombre, setNombre] = useState("");
  const [dia, setDia] = useState("");
  const [repartidor, setRepartidor] = useState("");

  useEffect(() => {
    // Si la actualizacion fue correcta, reset rutaActualizar y redireccionar a la pagina de rutas
    if (successActualizar) {
      dispatch({ type: RESET_RUTA_ACTUALIZAR });
      alert("La actualización fue exitosa");
      navigate("/rutas");
    }

    // Si no hay ruta o la ruta no es el que seleccione, disparar la accion de
    // obtener ruta
    if (!ruta || ruta.id !== Number(rutaId)) {
      dispatch(obtenerRutaDetalles(rutaId));
    } else {
      setNombre(ruta.NOMBRE);
      setDia(ruta.DIA);
      setRepartidor(ruta.REPARTIDOR);
    }
  }, [dispatch, ruta, rutaId, successActualizar, navigate]);

  const manejarActualizarRuta = (e) => {
    e.preventDefault();
    // Disparar la accion de actualizar producto
    dispatch(
      actualizarRuta({
        // El id es para el endpoint, no como informacion de actualizacion
        id: rutaId,
        NOMBRE: nombre,
        DIA: dia,
        REPARTIDOR: repartidor,
      })
    );
  };

  const manejarRegresar = () => {
    // Redireccionar a la pagina de productos
    dispatch({ type: RESET_RUTA_DETALLES });
    navigate("/rutas");
  };

  return (
    ruta && (
      <StyledContainer fluid>
        {loadingActualizar && <Loader />}
        {errorActualizar && (
          <Mensaje variant="danger">{errorActualizar}</Mensaje>
        )}
        {/* Esta es la parte que cambia en las paginas */}
        <h1>Ruta #{ruta.id}</h1>
        <Button variant="primary" onClick={manejarRegresar}>
          Regresar
        </Button>
        <Form onSubmit={manejarActualizarRuta}>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="dia">
            <Form.Label>Dia</Form.Label>
            <Form.Control
              type="text"
              value={dia}
              onChange={(e) => setDia(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="repartidor">
            <Form.Label>Repartidor</Form.Label>
            <Form.Control
              type="text"
              value={repartidor}
              onChange={(e) => setRepartidor(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit">Actualizar ruta</Button>
        </Form>
      </StyledContainer>
    )
  );
};

export default RutaDetalles;
