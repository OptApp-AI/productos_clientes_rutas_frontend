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
  StyledFormGroup,
} from "./styles/RutaDetalles.styles";
import { toast } from "react-hot-toast";
import { pedirUsuariosLista } from "../actions/usuarioActions";

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
    loading: actualizarLoading,
    success: actualizarSuccess,
    error: actualizarError,
  } = rutaActualizar;

  // Obtener el estado desde el Redux store
  const usuarioLista = useSelector((state) => state.usuarioLista);

  const {
    loading: usuariosLoading,
    usuarios,
    error: usuariosError,
  } = usuarioLista;

  const [nombre, setNombre] = useState("");
  const [repartidor, setRepartidor] = useState();

  useEffect(() => {
    // Si no hay ruta o la ruta no es el que seleccione, disparar la accion de
    // obtener ruta
    if (!ruta || ruta.id !== Number(rutaId)) {
      dispatch(obtenerRutaDetalles(rutaId));
    } else {
      setNombre(ruta.NOMBRE);
      setRepartidor(ruta.REPARTIDOR);
    }
  }, [dispatch, ruta, rutaId, actualizarSuccess, navigate]);

  // useEffect para mostrar las alertas de actualizar ruta
  useEffect(() => {
    if (actualizarLoading) {
      toast.loading("Actualizando ruta");
    }

    if (actualizarSuccess) {
      toast.remove();
      toast.success("La actualización fue exitosa");

      dispatch({ type: RESET_RUTA_ACTUALIZAR });
      navigate("/rutas");
    }

    if (actualizarError) {
      toast.dismiss();
      toast.error("Error al actualizar ruta");
    }
  }, [
    actualizarSuccess,
    actualizarError,
    actualizarLoading,
    dispatch,
    navigate,
  ]);

  // useEffect para mostrar las alertas al cargar usuarios
  useEffect(() => {
    if (usuariosLoading) {
      toast.loading("Cargando usuarios");
    }

    if (!usuarios) {
      toast.dismiss();
      dispatch(pedirUsuariosLista());
    }

    if (usuariosError) {
      toast.dismiss();
      toast.error("Error al cargar la lista de usuarios");
    }
  }, [usuariosLoading, usuariosError, usuarios, dispatch]);

  const manejarActualizarRuta = (e) => {
    e.preventDefault();

    // Disparar la accion de actualizar producto
    dispatch(
      actualizarRuta({
        // El id es para el endpoint, no como informacion de actualizacion
        id: rutaId,
        NOMBRE: nombre,
        // SI RESETEAS LA RUTADIA ENTONCES SE LE ASIGNA EL REPARTIDOR DE RUTA
        REPARTIDOR: repartidor,
        REPARTIDOR_NOMBRE: getRepartidorName(usuarios, repartidor),
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
        <StyledRow style={{ height: "100%" }}>
          <StyledCol>
            <Loader />
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  // Renderizar mensaje de error si el servidor regresa un error al pedir la informacion de la ruta
  if (error)
    return (
      <StyledContainer fluid>
        <StyledRow style={{ height: "100%" }}>
          <StyledCol>
            <Mensaje variant="danger">
              Hubo un error al cargar la informacion de la ruta
            </Mensaje>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

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

              <StyledFormGroup controlId="repartidor">
                <Form.Label>Repartidor</Form.Label>
                <Form.Control
                  as="select"
                  value={repartidor}
                  onChange={(e) => setRepartidor(e.target.value)}
                >
                  {usuarios &&
                    usuarios.map((usuario) => (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.name}
                      </option>
                    ))}
                </Form.Control>
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

const getRepartidorName = (usuarios, repartidor) =>
  usuarios.find((user) => user.id === Number(repartidor)).name;
