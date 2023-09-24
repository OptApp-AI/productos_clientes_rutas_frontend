import axios from "axios";
import {
  FAIL_CLIENTE_LISTA,
  REQUEST_CLIENTE_LISTA,
  SUCCESS_CLIENTE_LISTA,
} from "../constantes/clienteConstantes";
import { actualizarAccessToken } from "./sesionActions";
import { BASE_URL } from "../constantes/constantes";

// Creador de acciones para pedir los clientes del backend
export const pedirClientesLista = () => async (dispatch, getState) => {
  dispatch({ type: REQUEST_CLIENTE_LISTA });

  // Intentar pedir lista de productos al backend
  try {
    // Obtener el token desde el Redux store
    const {
      usuarioInfo: { token },
    } = getState();

    // Crear header con el tipo de datos que se envia y el token para autenticacio
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // Recibir la respuesta del backend y guardarla en data
    const { data } = await axios.get("api/clientes-salida-ruta/", config);

    dispatch({ type: SUCCESS_CLIENTE_LISTA, payload: data });
  } catch (error) {
    // Si el backend responde con un error 401 (no autorizado) intentar actualizar el token
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(pedirClientesLista));
    } else {
      dispatch({ type: FAIL_CLIENTE_LISTA, payload: error.message });
    }
  }
};
