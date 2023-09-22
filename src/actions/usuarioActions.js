import axios from "axios";
import {
  REQUEST_LOGIN_USUARIO,
  SUCCESS_LOGIN_USUARIO,
  FAIL_LOGIN_USUARIO,
  REQUEST_USUARIO_LISTA,
  SUCCESS_USUARIO_LISTA,
  FAIL_USUARIO_LISTA,
} from "../constantes/usuarioConstantes";
import { actualizarAccessToken } from "./sesionActions";

export const pedirUsuariosLista = () => async (dispatch, getState) => {
  dispatch({ type: REQUEST_USUARIO_LISTA });

  try {
    const {
      usuarioInfo: { token },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("/api/usuarios/", config);

    dispatch({ type: SUCCESS_USUARIO_LISTA, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_USUARIO_LISTA, payload: error.message });

    // Redirect user to "/" page if error is due to expired token
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(pedirUsuariosLista));
    }
  }
};
