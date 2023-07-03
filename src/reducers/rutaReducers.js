import {
  FAIL_RUTA_ACTUALIZAR,
  FAIL_RUTA_BORRAR,
  FAIL_RUTA_DETALLES,
  FAIL_RUTA_LISTA,
  FAIL_RUTA_REGISTRAR,
  REQUEST_RUTA_ACTUALIZAR,
  REQUEST_RUTA_BORRAR,
  REQUEST_RUTA_DETALLES,
  REQUEST_RUTA_LISTA,
  REQUEST_RUTA_REGISTRAR,
  RESET_RUTA_ACTUALIZAR,
  RESET_RUTA_BORRAR,
  RESET_RUTA_DETALLES,
  RESET_RUTA_LISTA,
  RESET_RUTA_REGISTRAR,
  SUCCESS_RUTA_ACTUALIZAR,
  SUCCESS_RUTA_BORRAR,
  SUCCESS_RUTA_DETALLES,
  SUCCESS_RUTA_LISTA,
  SUCCESS_RUTA_REGISTRAR,
} from "../constantes/rutaConstantes";

// Exito contiene informacion del backend
export const rutaListaReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_RUTA_LISTA:
      return { loading: true };

    case SUCCESS_RUTA_LISTA:
      return { loading: false, rutas: action.payload };

    case FAIL_RUTA_LISTA:
      return { loading: false, error: action.payload };

    case RESET_RUTA_LISTA:
      return {};

    default:
      return state;
  }
};

// Exito contiene informacion del backend
export const rutaDetallesReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_RUTA_DETALLES:
      return { loading: true };

    case SUCCESS_RUTA_DETALLES:
      return { loading: false, ruta: action.payload };

    case FAIL_RUTA_DETALLES:
      return { loading: false, error: action.payload };

    case RESET_RUTA_DETALLES:
      return {};

    default:
      return state;
  }
};

//  No es necesario informacion del backend en exito
// En la venta exito si contiene informacion del backend
export const rutaActualizarReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_RUTA_ACTUALIZAR:
      return { loading: true };

    case SUCCESS_RUTA_ACTUALIZAR:
      return { loading: false, success: true };

    case FAIL_RUTA_ACTUALIZAR:
      return { loading: false, error: action.payload };

    case RESET_RUTA_ACTUALIZAR:
      return {};

    default:
      return state;
  }
};

// No es necesario informacion del backend en exito
// En la venta exito si contiene informacion del backend
export const rutaRegistrarReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_RUTA_REGISTRAR:
      return { loading: true };

    case SUCCESS_RUTA_REGISTRAR:
      return { loading: false, success: true };

    case FAIL_RUTA_REGISTRAR:
      return { loading: false, error: action.payload };

    case RESET_RUTA_REGISTRAR:
      return {};

    default:
      return state;
  }
};

//  No es necesario informacion del backend en exito
// En la venta borrar no es posible
export const rutaBorrarReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_RUTA_BORRAR:
      return { loading: true };

    case SUCCESS_RUTA_BORRAR:
      return { loading: false, success: true };

    case FAIL_RUTA_BORRAR:
      return { loading: false, error: action.payload };

    case RESET_RUTA_BORRAR:
      return {};

    default:
      return state;
  }
};
