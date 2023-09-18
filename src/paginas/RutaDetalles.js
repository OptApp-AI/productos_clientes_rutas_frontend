import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { actualizarRuta, obtenerRutaDetalles } from "../actions/rutaActions";
import Loader from "../componentes/general/Loader";
import Mensaje from "../componentes/general/Mensaje";
import {
  RESET_RUTA_ACTUALIZAR,
  RESET_RUTA_DETALLES,
} from "../constantes/rutaConstantes";
// Estilos de la pagina
import { 
  StyledContainer,
  StyledRow,
  StyledCol,
  StyledButton,
  StyledFormGroup
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

  // Renderizar loading si se esta cargando la informacion de la ruta
  if (loading)
   return (
    <StyledContainer fluid>
      <StyledRow  style={{height: "100%"}}>
        <StyledCol>
          <Loader />
        </StyledCol>
      </StyledRow>
    </StyledContainer>
   )

  // Renderizar mensaje de error si el servidor regresa un error al pedir la informacion de la ruta
  if (error)
    return (
      <StyledContainer fluid>
        <StyledRow  style={{height: "100%"}}>
          <StyledCol>
            <Mensaje variant="danger">
              Hubo un error al cargar la informacion de la ruta
            </Mensaje>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    )

  return (
    ruta && (
      <StyledContainer fluid>

        <StyledRow>
          <StyledCol>
            <h1>Ruta #{ruta.id}</h1>
            <StyledButton variant="primary" onClick={manejarRegresar}>
              Regresar
            </StyledButton>
          </StyledCol>
        </StyledRow>


          <Form onSubmit={manejarActualizarRuta}>
          <StyledRow>
            <StyledCol md={6}>
              <StyledFormGroup controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                ></Form.Control>
              </StyledFormGroup>

              <StyledFormGroup controlId="dia">
                <Form.Label>Dia</Form.Label>
                <Form.Control
                  type="text"
                  value={dia}
                  onChange={(e) => setDia(e.target.value)}
                ></Form.Control>
              </StyledFormGroup>

              <StyledFormGroup controlId="repartidor">
                <Form.Label>Repartidor</Form.Label>
                <Form.Control
                  type="text"
                  value={repartidor}
                  onChange={(e) => setRepartidor(e.target.value)}
                ></Form.Control>
              </StyledFormGroup>
              <StyledButton type="submit">Actualizar ruta</StyledButton>
             </StyledCol>
             </StyledRow>
          </Form>
      </StyledContainer>
    )
  );
};

export default RutaDetalles;
