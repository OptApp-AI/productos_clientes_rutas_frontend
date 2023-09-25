import {
  FAIL_CLIENTE_LISTA,
  REQUEST_CLIENTE_LISTA,
  RESET_CLIENTE_LISTA,
  SUCCESS_CLIENTE_LISTA,
} from "../constantes/clienteConstantes";

// Exito contiene informacion del backend
export const clienteListaReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CLIENTE_LISTA:
      return { loading: true };

    case SUCCESS_CLIENTE_LISTA:
      return {
        loading: false,
        clientes: action.payload,
      };

    case FAIL_CLIENTE_LISTA:
      return { loading: false, error: action.payload };

    case RESET_CLIENTE_LISTA:
      return {};

    default:
      return state;
  }
};
