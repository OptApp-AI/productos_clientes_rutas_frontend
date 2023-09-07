import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
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

import { RESET_RUTA_DETALLES } from "../constantes/rutaConstantes";

// Importar tabla de rutas
import TablaRutas from '../componentes/RutasLista/TablaRutas'
// Importar ventana emergente de rutas
import VentanaMostrarRuta from '../componentes/RutasLista/VentanaMostrarRuta'
// Custom Hook para la ventana emergente de los detalles de la ruta
import { useMostrarDetallesRuta } from './utilis/RutasLista.utilis';
// Estilos de la pagina
import {
  StyledContainer,
  StyledRow,
  StyledCol
} from './styles/RutasLista.styles'

const RutasLista = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Funcion para nevagar en la aplicacion
  const navigate = useNavigate();
  // Obtener el estado desde el Redux store
  const rutaLista = useSelector((state) => state.rutaLista);
  const { loading, rutas, error } = rutaLista;

  // Obtener el estado desde el Redux sotore
  //   const productoBorrar = useSelector((state) => state.productoBorrar);
  //   const {
  //     loading: loadingBorrar,
  //     success: successBorrar,
  //     error: errorBorrar,
  //   } = productoBorrar;

  useEffect(() => {
    // if (successBorrar) {
    //   dispatch({ type: RESET_PRODUCTO_BORRAR });
    //   alert("La eliminación fue exitosa");
    // }

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

  // Custom hook para los detalles de la ruta
  const {
    mostrarRuta,
    ruta,
    manejarCerrarVentana,
    manejarMostrarDetallesRuta
   } = useMostrarDetallesRuta(dispatch, rutas);

  // YO DIGO QUE NO DEBERIA SER POSIBLE BORRAR RUTAS
  const manejarBorrarRuta = (id) => {
    if (window.confirm("¿Está seguro de eliminar este producto")) {
      //dispatch(borrarProducto(id));
      alert(`Ruta id: ${id}`);
    } else {
      alert("Operación cancelada");
    }
  };

  // Renderizar loading si se estan cargando las rutas
  if(loading)
    return (
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol>
            <Loader />
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  
  // Renderizar mensaj de error si el servidor regresa un error al pedir la lista de rutas
  if(error) 
      return(
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
              rutas = {rutas}
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