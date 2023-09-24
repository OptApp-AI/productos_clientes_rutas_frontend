import {
  FAIL_RUTA_ACTUALIZAR,
  FAIL_RUTA_BORRAR,
  FAIL_RUTA_DETALLES,
  FAIL_RUTA_DIA_ACTUALIZAR,
  FAIL_RUTA_DIA_CLIENTES,
  FAIL_RUTA_DIA_DETALLES,
  FAIL_RUTA_DIA_LISTA,
  FAIL_RUTA_LISTA,
  FAIL_RUTA_REGISTRAR,
  FAIL_RUTA_SALIDA_RUTA_LISTA,
  REQUEST_RUTA_ACTUALIZAR,
  REQUEST_RUTA_BORRAR,
  REQUEST_RUTA_DETALLES,
  REQUEST_RUTA_DIA_ACTUALIZAR,
  REQUEST_RUTA_DIA_CLIENTES,
  REQUEST_RUTA_DIA_DETALLES,
  REQUEST_RUTA_DIA_LISTA,
  REQUEST_RUTA_LISTA,
  REQUEST_RUTA_REGISTRAR,
  REQUEST_RUTA_SALIDA_RUTA_LISTA,
  RESET_RUTA_ACTUALIZAR,
  RESET_RUTA_BORRAR,
  RESET_RUTA_DETALLES,
  RESET_RUTA_DIA_ACTUALIZAR,
  RESET_RUTA_DIA_DETALLES,
  RESET_RUTA_DIA_LISTA,
  RESET_RUTA_LISTA,
  RESET_RUTA_REGISTRAR,
  RESET_RUTA_SALIDA_RUTA_LISTA,
  SUCCESS_RUTA_ACTUALIZAR,
  SUCCESS_RUTA_BORRAR,
  SUCCESS_RUTA_DETALLES,
  SUCCESS_RUTA_DIA_ACTUALIZAR,
  SUCCESS_RUTA_DIA_CLIENTES,
  SUCCESS_RUTA_DIA_DETALLES,
  SUCCESS_RUTA_DIA_LISTA,
  SUCCESS_RUTA_LISTA,
  SUCCESS_RUTA_REGISTRAR,
  SUCCESS_RUTA_SALIDA_RUTA_LISTA,
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

// Exito contiene informacion del backend
export const rutaDiasListaReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_RUTA_DIA_LISTA:
      return { loading: true };

    case SUCCESS_RUTA_DIA_LISTA:
      return { loading: false, rutaDias: action.payload };

    case FAIL_RUTA_DIA_LISTA:
      return { loading: false, error: action.payload };

    case RESET_RUTA_DIA_LISTA:
      return {};

    default:
      return state;
  }
};

// Exito contiene informacion del backend
export const rutaDiaDetallesReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_RUTA_DIA_DETALLES:
      return { loading: true };

    case SUCCESS_RUTA_DIA_DETALLES:
      return { loading: false, rutaDia: action.payload };

    case FAIL_RUTA_DIA_DETALLES:
      return { loading: false, error: action.payload };

    case RESET_RUTA_DIA_DETALLES:
      return {};

    default:
      return state;
  }
};

export const clientesRutaDiaReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_RUTA_DIA_CLIENTES:
      return { loading: true };

    case SUCCESS_RUTA_DIA_CLIENTES:
      return { loading: false, clientesRuta: action.payload };

    case FAIL_RUTA_DIA_CLIENTES:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const rutaDiaActualizarReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_RUTA_DIA_ACTUALIZAR:
      return { loading: true };

    case SUCCESS_RUTA_DIA_ACTUALIZAR:
      return { loading: false, success: true };

    case FAIL_RUTA_DIA_ACTUALIZAR:
      return { loading: false, error: action.payload };

    case RESET_RUTA_DIA_ACTUALIZAR:
      return {};

    default:
      return state;
  }
};

// Exito contiene informacion del backend
export const rutaSalidaRutaListaReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_RUTA_SALIDA_RUTA_LISTA:
      return { loading: true };

    case SUCCESS_RUTA_SALIDA_RUTA_LISTA:
      return { loading: false, rutasSalidaRuta: action.payload };

    case FAIL_RUTA_SALIDA_RUTA_LISTA:
      return { loading: false, error: action.payload };

    case RESET_RUTA_SALIDA_RUTA_LISTA:
      return {};

    default:
      return state;
  }
};
