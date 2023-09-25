import axios from "axios";
import {
  FAIL_PRODUCTO_LISTA,
  REQUEST_PRODUCTO_LISTA,
  SUCCESS_PRODUCTO_LISTA,
} from "../constantes/productoConstantes";
import { actualizarAccessToken } from "./sesionActions";

// Creador de acciones para pedir los productos del backend
export const pedirProductosLista = () => async (dispatch, getState) => {
  dispatch({ type: REQUEST_PRODUCTO_LISTA });

  // Intentar pedir lista de productos al backend
  try {
    // Obtener token del Redux store
    const {
      usuarioInfo: { token },
    } = getState();

    // Crear header con tipo de datos que se envian y token para autenticacion
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // Recibir respuesta del backend y guardarla en data
    const { data } = await axios.get("api/productos/", config);

    dispatch({ type: SUCCESS_PRODUCTO_LISTA, payload: data });
  } catch (error) {
    // Si el backend responde con error de tipo 401 (no autorizado) intentar actualizar el token
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(pedirProductosLista));
    } else {
      dispatch({ type: FAIL_PRODUCTO_LISTA, payload: error.message });
    }
  }
};
