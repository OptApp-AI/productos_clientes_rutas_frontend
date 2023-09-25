import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registrarRuta } from "../actions/rutaActions";
import { RESET_RUTA_REGISTRAR } from "../constantes/rutaConstantes";
import { toast } from "react-hot-toast";

import {
  StyledContainer,
  StyledRow,
  StyledCol,
  StyledFormGroup,
  StyledBoton,
} from "./styles/RegistrarRuta.styles";
import { pedirUsuariosLista } from "../actions/usuarioActions";
import Loader from "../componentes/general/Loader";
import Mensaje from "../componentes/general/Mensaje";

const RegistrarRuta = () => {
  // Funcion para disparar acciones
  const dispatch = useDispatch();
  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener estado del Redux store
  const usuarioLista = useSelector((state) => state.usuarioLista);
  const {
    loading: usuariosLoading,
    usuarios,
    error: usuariosError,
  } = usuarioLista;

  // Obtener el estado desde el Redux store
  const rutaRegistrar = useSelector((state) => state.rutaRegistrar);
  const {
    loading: registrarLoading,
    success: registrarSuccess,
    error: registrarError,
  } = rutaRegistrar;

  const [nombre, setNombre] = useState("");
  const [repartidor, setRepartidor] = useState("");

  // useEffect para cargar los usuarios
  useEffect(() => {
    if (!usuarios) {
      dispatch(pedirUsuariosLista());
    } else {
      setRepartidor(usuarios[0].id);
    }
  }, [usuarios, dispatch]);

  useEffect(() => {
    if (registrarLoading) {
      toast.loading("Registrando ruta");
    }
    // Si el registro fue correcto, reset rutaRegistrar y redireccionar a la pagina de rutas
    if (registrarSuccess) {
      toast.remove();
      toast.success("Ruta registrado");
      dispatch({ type: RESET_RUTA_REGISTRAR });

      navigate("/rutas");
    }

    if (registrarError) {
      toast.dismiss();
      toast.error("Error al registrar ruta");
    }
  }, [navigate, registrarSuccess, registrarLoading, registrarError, dispatch]);

  const manejarRegistrarRuta = (e) => {
    e.preventDefault();

    // Disparar la accion de registrar
    dispatch(
      registrarRuta({
        NOMBRE: nombre,
        REPARTIDOR: repartidor,
        REPARTIDOR_NOMBRE: getRepartidorName(usuarios, repartidor),
      })
    );
  };

  // Renderizar loading si se esta cargando la informacion de la ruta
  if (usuariosLoading)
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
  if (usuariosError)
    return (
      <StyledContainer fluid>
        <StyledRow style={{ height: "100%" }}>
          <StyledCol>
            <Mensaje variant="danger">
              Hubo un error al cargar la lista de empleados
            </Mensaje>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  // Aqui no es necesario empezar con loading porque no hay un estado necesario al cargar el componente.
  return (
    <StyledContainer fluid>
      <h1>Registrar ruta</h1>
      <Form onSubmit={manejarRegistrarRuta}>
        <StyledRow>
          <StyledCol md={6}>
            <StyledFormGroup controlId="dia">
              <Form.Label>NOMBRE</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
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
          </StyledCol>
        </StyledRow>

        <StyledRow>
          <StyledCol>
            <StyledBoton type="submit">Registrar ruta</StyledBoton>
          </StyledCol>
        </StyledRow>
      </Form>
    </StyledContainer>
  );
};

export default RegistrarRuta;

const getRepartidorName = (usuarios, repartidor) =>
  usuarios.find((user) => user.id === Number(repartidor)).name;
