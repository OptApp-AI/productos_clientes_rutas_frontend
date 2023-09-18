import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pedirSalidaRutasLista } from "../actions/salidaRutaActions";

import Loader from "../componentes/general/Loader";
import Mensaje from "../componentes/general/Mensaje";
import TablaSalidasRuta from "../componentes/SalidaRuta/TablaSalidasRuta";
import VentanaMostrarSalidaRuta from "../componentes/SalidaRuta/VentanaMostrarSalidaRuta";
import {
  RESET_SALIDA_RUTA_DETALLES,
  RESET_SALIDA_RUTA_VENTA,
} from "../constantes/salidaRutaConstantes";
import { formatearFecha } from "../utilitis";

// Estilos de la pagina
import {
  StyledContainer,
  StyledRow,
  StyledCol
} from './styles/SalidaRutasLista.styles'

const SalidaRutaLista = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Funcion para nevagar en la aplicacion
  const navigate = useNavigate();
  // Obtener el estado desde el Redux store
  const salidaRutaLista = useSelector((state) => state.salidaRutaLista);
  const { loading, salidaRutas, error } = salidaRutaLista;

  const [mostrarSalidaRuta, setMostrarSalidaRuta] = useState(false);
  const [salidaRuta, setSalidaRuta] = useState({});

  useEffect(() => {
    // Si no hay salidaRutas, disparar la accion de pedir salidaRutas
    if (!salidaRutas) {
      dispatch(pedirSalidaRutasLista());
    }
  }, [dispatch, salidaRutas]);

  const manejarSalidaRutaDetalles = (id) => {
    // Redireccionar a la pagina de la salidaRuta
    dispatch({ type: RESET_SALIDA_RUTA_DETALLES });
    navigate(`/salida-rutas/${id}`);
  };

  const manejarCerrarVentana = () => {
    setMostrarSalidaRuta(false);
  };

  const manejarMostrarDetallesSalidaRuta = (salidaRutaId) => {
    const salidaRutaSeleccionada = salidaRutas.find(
      (v) => v.id === salidaRutaId
    );
    setSalidaRuta(salidaRutaSeleccionada);
    setMostrarSalidaRuta(true);
  };

  const manejarSalidaRutaVenta = (e, salidaRutaId) => {
    e.stopPropagation();
    // alert(salidaRutaId);
    // dispatch({ type: RESET_SALIDA_RUTA_VENTA });
    navigate(`/venta-salida-ruta/${salidaRutaId}`);
  };

  // Renderizar loading si se estan cargando las rutas
  if (loading)
    return (
      <StyledContainer>
        <StyledRow>
          <StyledCol>
            <Loader />
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    )

  // Renderizar mensaje de error si el servidor regresa un error al pedir la lista de salidas a ruta
  if (error)
    return (
      <StyledContainer>
        <StyledRow>
          <StyledCol>
            <Mensaje variant="danger">
              Hubo un error al cargar la lista de salidas a ruta
            </Mensaje>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    )

  return (
    salidaRutas && (
      <>
      <StyledContainer fluid>
        <h1>Salida Rutas</h1>
       
       <StyledRow>
        <StyledCol>
          <TablaSalidasRuta 
              salidaRutas={salidaRutas}
              manejarMostrarDetallesSalidaRuta={manejarMostrarDetallesSalidaRuta}
              formatearFecha={formatearFecha}
              manejarSalidaRutaDetalles={manejarSalidaRutaDetalles}
              manejarSalidaRutaVenta={manejarSalidaRutaVenta}
          />
          </StyledCol>
        </StyledRow>
      </StyledContainer>

        {/* Mostrar venta */}
        {mostrarSalidaRuta && (
          <VentanaMostrarSalidaRuta
            salidaRuta={salidaRuta}
            mostrarSalidaRuta={mostrarSalidaRuta}
            manejarCerrarVentana={manejarCerrarVentana}
          />
        )}
      </>
    )
  );
};

export default SalidaRutaLista;
