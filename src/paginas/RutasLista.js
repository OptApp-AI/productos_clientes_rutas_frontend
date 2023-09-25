import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { borrarRuta, pedirRutasLista } from "../actions/rutaActions";
import { pedirRutasLista } from "../actions/rutaActions";
import Loader from "../componentes/general/Loader";
import Mensaje from "../componentes/general/Mensaje";
// import {
//   RESET_RUTA_BORRAR,
//   RESET_RUTA_DETALLES,
// } from "../constantes/rutaConstantes";

import {
  RESET_RUTA_BORRAR,
  RESET_RUTA_DETALLES,
} from "../constantes/rutaConstantes";

// Importar tabla de rutas
import TablaRutas from "../componentes/RutasLista/TablaRutas";
// Importar ventana emergente de rutas
import VentanaMostrarRuta from "../componentes/RutasLista/VentanaMostrarRuta";
// Custom Hook para la ventana emergente de los detalles de la ruta
import { useMostrarDetallesRuta } from "./utilis/RutasLista.utilis";
// Estilos de la pagina
import {
  StyledContainer,
  StyledRow,
  StyledCol,
} from "./styles/RutasLista.styles";
import { toast } from "react-hot-toast";
import ConfirmarBorrarObjeto from "../componentes/general/ConfirmarBorrarObjeto";

const RutasLista = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Funcion para nevagar en la aplicacion
  const navigate = useNavigate();

  // Obtener el estado desde el Redux store
  const rutaLista = useSelector((state) => state.rutaLista);
  const { loading, rutas, error } = rutaLista;

  // Custom hook para los detalles de la ruta
  const {
    mostrarRuta,
    ruta,
    manejarCerrarVentana,
    manejarMostrarDetallesRuta,
  } = useMostrarDetallesRuta(rutas);

  // Obtener el estado desde el Redux sotore
  const rutaBorrar = useSelector((state) => state.rutaBorrar);
  const { loading: borrarLoading, success, error: borrarError } = rutaBorrar;

  // useEffect para mostrar las alertas de borrar producto
  useEffect(() => {
    if (borrarLoading) {
      toast.loading("Eliminando ruta");
    }

    if (success) {
      toast.dismiss();
      toast.success("Ruta eliminada exitosamente", {
        duration: 2000,
      });
      // Reset producto borrar para no ejecutar este bloque de codigo cada vez que se ingresa a lista de productos
      dispatch({ type: RESET_RUTA_BORRAR });
    }

    if (borrarError) {
      toast.remove();
      toast.error("Error al eliminar producto", {
        duration: 4000,
      });
    }
  }, [borrarError, borrarLoading, success, dispatch]);

  // useEffect para cargar rutas
  useEffect(() => {
    // Si no hay rutas, disparar la accion de pedir rutas
    if (!rutas) {
      dispatch(pedirRutasLista());
    }
  }, [dispatch, rutas]);

  const manejarRutaDetalles = (id) => {
    // Redireccionar a la pagina del rutas
    dispatch({ type: RESET_RUTA_DETALLES });
    navigate(`/rutas/${id}`);
  };

  // Funcion para borrar el producto
  const manejarBorrarRuta = (e, id) => {
    e.stopPropagation();
    toast((t) => <ConfirmarBorrarObjeto id={id} t={t} objeto={"ruta"} />, {
      duration: 5000,
    });
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
    rutas && (
      <>
        <StyledContainer fluid>
          <h1>Rutas</h1>
          <StyledRow>
            <StyledCol>
              {/*Tabla de de rutas*/}
              <TablaRutas
                rutas={rutas}
                manejarMostrarDetallesRuta={manejarMostrarDetallesRuta}
                manejarRutaDetalles={manejarRutaDetalles}
                manejarBorrarRuta={manejarBorrarRuta}
              />
            </StyledCol>
          </StyledRow>
        </StyledContainer>

        {/* Mostrar ventana con detalles de la ruta */}
        {mostrarRuta && (
          <VentanaMostrarRuta
            ruta={ruta}
            mostrarRuta={mostrarRuta}
            manejarCerrarVentana={manejarCerrarVentana}
          />
        )}
      </>
    )
  );
};

export default RutasLista;
