import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  actualizarRuta,
  actualizarRutaDia,
  obtenerRutaDetalles,
  obtenerRutaDiaDetalles,
} from "../actions/rutaActions";
import Loader from "../componentes/general/Loader";
import Mensaje from "../componentes/general/Mensaje";
import {
  RESET_RUTA_ACTUALIZAR,
  RESET_RUTA_DETALLES,
  RESET_RUTA_DIA_ACTUALIZAR,
} from "../constantes/rutaConstantes";
// Estilos de la pagina
import {
  StyledContainer,
  StyledRow,
  StyledCol,
  StyledButton,
  StyledFormGroup,
  StyledButtonDanger,
} from "./styles/RutaDetalles.styles";
import { toast } from "react-hot-toast";
import { pedirUsuariosLista } from "../actions/usuarioActions";

const RutaDiasDetalles = () => {
  // Obtener el id de la ruta
  const params = useParams();
  const rutaDiaId = params.id;
  // Funcion para disparar las acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Funcion para obtener rutaId
  const location = useLocation();
  const rutaId = location.search.split("=")[1];

  // Obtener el estado desde el Redux store
  const rutaDiaDetalles = useSelector((state) => state.rutaDiaDetalles);
  const { loading, rutaDia, error } = rutaDiaDetalles;

  // Obtener el estado desde el Redux store
  const rutaDiaActualizar = useSelector((state) => state.rutaDiaActualizar);
  const {
    loading: actualizarLoading,
    success: actualizarSuccess,
    error: actualizarError,
  } = rutaDiaActualizar;

  // Obtener el estado desde el Redux store
  const usuarioLista = useSelector((state) => state.usuarioLista);

  const {
    loading: usuariosLoading,
    usuarios,
    error: usuariosError,
  } = usuarioLista;

  const [repartidor, setRepartidor] = useState();

  useEffect(() => {
    // Si no hay ruta o la ruta no es el que seleccione, disparar la accion de
    // obtener ruta
    if (!rutaDia || rutaDia.id !== Number(rutaDiaId)) {
      dispatch(obtenerRutaDiaDetalles(rutaDiaId));
    } else {
      setRepartidor(rutaDia.REPARTIDOR);
    }
  }, [dispatch, rutaDia, rutaDiaId]);

  // useEffect para mostrar las alertas de actualizar ruta
  useEffect(() => {
    if (actualizarLoading) {
      toast.loading("Actualizando ruta");
    }

    if (actualizarSuccess) {
      toast.remove();
      toast.success("La actualización fue exitosa");

      dispatch({ type: RESET_RUTA_DIA_ACTUALIZAR });
      navigate(`/rutas/${rutaId}/dias`);
    }

    if (actualizarError) {
      toast.dismiss();
      toast.error("Error al actualizar ruta");
    }
  }, [
    actualizarSuccess,
    actualizarError,
    actualizarLoading,
    rutaId,
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

  const manejarActualizarRutaDia = (e) => {
    e.preventDefault();

    const rutaDiaActualizada = {
      // El id es para el endpoint, no como informacion de actualizacion
      id: rutaDiaId,
      // SI RESETEAS LA RUTADIA ENTONCES SE LE ASIGNA EL REPARTIDOR DE RUTA
      RUTA: rutaDia.RUTA,
      DIA: rutaDia.DIA,
      REPARTIDOR: repartidor,
      REPARTIDOR_NOMBRE: getRepartidorName(usuarios, repartidor),
    };

    // Disparar la accion de actualizar ruta dia
    dispatch(actualizarRutaDia(rutaDiaActualizada));
  };

  const manejarRegresar = () => {
    // Redireccionar a la pagina de productos
    dispatch({ type: RESET_RUTA_DETALLES });
    navigate(`/rutas/${rutaId}/dias`);
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
    rutaDia && (
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol>
            <h1>
              {rutaDia.NOMBRE} - {rutaDia.DIA}
            </h1>
            <StyledButton variant="primary" onClick={manejarRegresar}>
              Regresar
            </StyledButton>
          </StyledCol>
        </StyledRow>

        <Form onSubmit={manejarActualizarRutaDia}>
          <StyledRow>
            <StyledCol md={4}>
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

export default RutaDiasDetalles;

const getRepartidorName = (usuarios, repartidor) =>
  usuarios.find((user) => user.id === Number(repartidor)).name;
