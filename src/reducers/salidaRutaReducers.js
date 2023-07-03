import {
  FAIL_SALIDA_RUTA_ACTUALIZAR,
  FAIL_SALIDA_RUTA_DETALLES,
  FAIL_SALIDA_RUTA_LISTA,
  FAIL_SALIDA_RUTA_REGISTRAR,
  FAIL_SALIDA_RUTA_VENTA,
  REQUEST_SALIDA_RUTA_ACTUALIZAR,
  REQUEST_SALIDA_RUTA_DETALLES,
  REQUEST_SALIDA_RUTA_LISTA,
  REQUEST_SALIDA_RUTA_REGISTRAR,
  REQUEST_SALIDA_RUTA_VENTA,
  RESET_SALIDA_RUTA_ACTUALIZAR,
  RESET_SALIDA_RUTA_DETALLES,
  RESET_SALIDA_RUTA_LISTA,
  RESET_SALIDA_RUTA_REGISTRAR,
  RESET_SALIDA_RUTA_VENTA,
  SUCCESS_SALIDA_RUTA_ACTUALIZAR,
  SUCCESS_SALIDA_RUTA_DETALLES,
  SUCCESS_SALIDA_RUTA_LISTA,
  SUCCESS_SALIDA_RUTA_REGISTRAR,
  SUCCESS_SALIDA_RUTA_VENTA,
} from "../constantes/salidaRutaConstantes";

// Exito contiene informacion del backend
export const salidaRutaListaReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_SALIDA_RUTA_LISTA:
      return { loading: true };

    case SUCCESS_SALIDA_RUTA_LISTA:
      return { loading: false, salidaRutas: action.payload };

    case FAIL_SALIDA_RUTA_LISTA:
      return { loading: false, error: action.payload };

    case RESET_SALIDA_RUTA_LISTA:
      return {};

    default:
      return state;
  }
};

// Exito contiene informacion del backend
export const salidaRutaDetallesReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_SALIDA_RUTA_DETALLES:
      return { loading: true };

    case SUCCESS_SALIDA_RUTA_DETALLES:
      return { loading: false, salidaRuta: action.payload };

    case FAIL_SALIDA_RUTA_DETALLES:
      return { loading: false, error: action.payload };

    case RESET_SALIDA_RUTA_DETALLES:
      return {};

    default:
      return state;
  }
};

// En la salidaRuta exito si contiene informacion del backend
export const salidaRutaActualizarReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_SALIDA_RUTA_ACTUALIZAR:
      return { loading: true };

    case SUCCESS_SALIDA_RUTA_ACTUALIZAR:
      return { loading: false, reporte: action.payload };

    case FAIL_SALIDA_RUTA_ACTUALIZAR:
      return { loading: false, error: action.payload };

    case RESET_SALIDA_RUTA_ACTUALIZAR:
      return {};

    default:
      return state;
  }
};

// En la salidaRuta exito si contiene informacion del backend
export const salidaRutaRegistrarReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_SALIDA_RUTA_REGISTRAR:
      return { loading: true };

    case SUCCESS_SALIDA_RUTA_REGISTRAR:
      return { loading: false, salidaRuta: action.payload };

    case FAIL_SALIDA_RUTA_REGISTRAR:
      return { loading: false, error: action.payload };

    case RESET_SALIDA_RUTA_REGISTRAR:
      return {};

    default:
      return state;
  }
};

// En la salidaRuta borrar no es posible
export const salidaRutaVentaReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_SALIDA_RUTA_VENTA:
      return { loading: true };
    case SUCCESS_SALIDA_RUTA_VENTA:
      return { loading: false, success: true };
    case FAIL_SALIDA_RUTA_VENTA:
      return { loading: false, error: action.payload };
    case RESET_SALIDA_RUTA_VENTA:
      return {};
    default:
      return state;
  }
};
