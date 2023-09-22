import {
  FAIL_PRODUCTO_LISTA,
  REQUEST_PRODUCTO_LISTA,
  RESET_PRODUCTO_LISTA,
  SUCCESS_PRODUCTO_LISTA,
} from "../constantes/productoConstantes";

// Exito contiene informacion del backend
export const productoListaReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_PRODUCTO_LISTA:
      return { loading: true };

    case SUCCESS_PRODUCTO_LISTA:
      return { loading: false, productos: action.payload };

    case FAIL_PRODUCTO_LISTA:
      return { loading: false, error: action.payload };

    case RESET_PRODUCTO_LISTA:
      return {};

    default:
      return state;
  }
};
