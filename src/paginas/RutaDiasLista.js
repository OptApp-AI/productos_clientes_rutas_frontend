import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { borrarRuta, pedirRutasLista } from "../actions/rutaActions";
import Loader from "../componentes/general/Loader";
import Mensaje from "../componentes/general/Mensaje";
// import {
//   RESET_RUTA_BORRAR,
//   RESET_RUTA_DETALLES,
// } from "../constantes/rutaConstantes";

import { RESET_RUTA_DETALLES } from "../constantes/rutaConstantes";

// Importar tabla de rutas
import TablaRutaDias from "../componentes/RutaDiasLista/TablaRutaDias";
// Importar ventana emergente de rutas
// Custom Hook para la ventana emergente de los detalles de la ruta
import { useMostrarDetallesRuta } from "./utilis/RutasLista.utilis";
// Estilos de la pagina
import {
  StyledContainer,
  StyledRow,
  StyledCol,
} from "./styles/RutasLista.styles";
import { pedirRutaDiasLista } from "../actions/rutaActions";
import { StyledButton } from "./styles/RutaDetalles.styles";
import VentanaMostrarRutaDias from "../componentes/RutaDiasLista/VentanaMostrarRutaDias";

const RutasDiasLista = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Funcion para nevagar en la aplicacion
  const navigate = useNavigate();

  const params = useParams();
  const rutaId = params.id;

  // Obtener el estado desde el Redux store
  const rutaDiasLista = useSelector((state) => state.rutaDiasLista);
  const { loading, rutaDias, error } = rutaDiasLista;

  // Custom hook para los detalles de la ruta
  const {
    mostrarRuta,
    ruta,
    manejarCerrarVentana,
    manejarMostrarDetallesRuta,
  } = useMostrarDetallesRuta(rutaDias);

  useEffect(() => {
    // Si no hay rutas, disparar la accion de pedir rutas
    if (!rutaDias || Number(rutaId) !== rutaDias[0].RUTA) {
      dispatch(pedirRutaDiasLista(rutaId));
    }
  }, [dispatch, rutaDias, rutaId]);

  const manejarRutaDetalles = (id) => {
    // Redireccionar a la pagina del rutas
    dispatch({ type: RESET_RUTA_DETALLES });
    navigate(`/rutas-dias/${id}?=${rutaId}`);
  };

  const manejarResetRuta = (id) => {
    if (
      window.confirm(
        "¿Está seguro de resetear esta ruta? Se vaciará la lista de clientes en esta ruta"
      )
    ) {
      //dispatch(borrarProducto(id));
      alert(`Ruta id: ${id}`);
    } else {
      alert("Operación cancelada");
    }
  };

  const manejarRegresar = () => {
    // Redireccionar a la pagina de productos
    dispatch({ type: RESET_RUTA_DETALLES });
    navigate("/rutas");
  };

  // Renderizar loading si se estan cargando las rutas
  if (loading)
    return (
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol>
            <Loader />
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  // Renderizar mensaje de error si el servidor regresa un error al pedir la lista de rutas
  if (error)
    return (
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol>
            <Mensaje variant="danger">
              Hubo un error al cargar la lista de rutas
            </Mensaje>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  return (
    rutaDias && (
      <>
        <StyledContainer fluid>
          <h1>Ruta {rutaDias[0].NOMBRE}</h1>
          <StyledButton
            style={{ margin: "auto" }}
            variant="primary"
            onClick={manejarRegresar}
          >
            Regresar
          </StyledButton>
          <StyledRow>
            <StyledCol>
              {/*Tabla de de rutas*/}
              <TablaRutaDias
                rutas={rutaDias}
                manejarMostrarDetallesRuta={manejarMostrarDetallesRuta}
                manejarRutaDetalles={manejarRutaDetalles}
                manejarBorrarRuta={manejarResetRuta}
              />
            </StyledCol>
          </StyledRow>
        </StyledContainer>

        {/* Mostrar ventana con detalles de la ruta */}
        {mostrarRuta && (
          <VentanaMostrarRutaDias
            ruta={ruta}
            mostrarRuta={mostrarRuta}
            manejarCerrarVentana={manejarCerrarVentana}
          />
        )}
      </>
    )
  );
};

export default RutasDiasLista;
