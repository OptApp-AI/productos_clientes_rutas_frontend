import {
  REQUEST_USUARIO_LISTA,
  SUCCESS_USUARIO_LISTA,
  FAIL_USUARIO_LISTA,
  RESET_USUARIO_LISTA,
} from "../constantes/usuarioConstantes";

export const usuarioListaReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_USUARIO_LISTA:
      return { loading: true };

    case SUCCESS_USUARIO_LISTA:
      return { loading: false, usuarios: action.payload };

    case FAIL_USUARIO_LISTA:
      return { loading: false, error: action.payload };

    case RESET_USUARIO_LISTA:
      return {};

    default:
      return state;
  }
};
