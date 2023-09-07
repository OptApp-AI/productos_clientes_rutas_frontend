import axios from "axios";
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
  RESET_RUTA_LISTA,
  SUCCESS_RUTA_ACTUALIZAR,
  SUCCESS_RUTA_BORRAR,
  SUCCESS_RUTA_DETALLES,
  SUCCESS_RUTA_LISTA,
  SUCCESS_RUTA_REGISTRAR,
} from "../constantes/rutaConstantes";
// import { RESET_CLIENTE_LISTA } from "../constantes/clienteConstantes";

// import { RESET_VENTA_LISTA } from "../constantes/ventaConstantes";

// Creador de acciones para pedir las rutas del backend
export const pedirRutasLista = () => async (dispatch, getState) => {
  dispatch({ type: REQUEST_RUTA_LISTA });

  try {
    const {
      usuarioInfo: { tokens },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
    };

    const { data } = await axios.get(
      "/api/rutas/",
      config
    );

    dispatch({ type: SUCCESS_RUTA_LISTA, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_RUTA_LISTA, payload: error.message });
  }
};

// Creador de acciones para pedir la ruta con el id del backend
export const obtenerRutaDetalles = (id) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_RUTA_DETALLES });

  try {
    const {
      usuarioInfo: { tokens },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
    };
    const { data } = await axios.get(
      `/api/rutas/${id}/`,
      config
    );

    dispatch({ type: SUCCESS_RUTA_DETALLES, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_RUTA_DETALLES, payload: error.message });
  }
};

// Creador de acciones para actualizar ruta del backend
export const actualizarRuta = (ruta) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_RUTA_ACTUALIZAR });

  try {
    const {
      usuarioInfo: { tokens },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
    };

    const { data } = await axios.put(
      `/api/modificar-ruta/${ruta.id}/`,
      ruta,
      config
    );

    dispatch({ type: SUCCESS_RUTA_ACTUALIZAR });
    dispatch({ type: RESET_RUTA_LISTA });
    // Debo volver a pedir la lista de clientes del bakcend
    // dispatch({ type: RESET_CLIENTE_LISTA });
    // Debo volver a pedir la lista de ventas del backend
    // dispatch({ type: RESET_VENTA_LISTA });
  } catch (error) {
    dispatch({ type: FAIL_RUTA_ACTUALIZAR, payload: error.message });
  }
};

// Creador de acciones para registrar un nuevo ruta en el backend
export const registrarRuta = (ruta) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_RUTA_REGISTRAR });

  try {
    const {
      usuarioInfo: { tokens },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
    };

    const { data } = await axios.post(
      "/api/crear-ruta/",
      ruta,
      config
    );

    dispatch({ type: SUCCESS_RUTA_REGISTRAR });
    dispatch({ type: RESET_RUTA_LISTA });
    // Debo volver a pedir la lista de clientes del bakcend
    // dispatch({ type: RESET_CLIENTE_LISTA });
    // Debo volver a pedir la lista de ventas del backend
    // dispatch({ type: RESET_VENTA_LISTA });
  } catch (error) {
    dispatch({ type: FAIL_RUTA_REGISTRAR, payload: error.message });
  }
};

// Creador de acciones para borrar un ruta en el backend
export const borrarRuta = (id) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_RUTA_BORRAR });

  try {
    const {
      usuarioInfo: { tokens },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
    };

    const { data } = await axios.delete(
      `/api/modificar-ruta/${id}/`,
      config
    );

    dispatch({ type: SUCCESS_RUTA_BORRAR });
    dispatch({ type: RESET_RUTA_LISTA });
    // Debo volver a pedir la lista de clientes del bakcend
    // dispatch({ type: RESET_CLIENTE_LISTA });
    // Debo volver a pedir la lista de ventas del backend
    // dispatch({ type: RESET_VENTA_LISTA });
  } catch (error) {
    dispatch({ type: FAIL_RUTA_BORRAR, payload: error.message });
  }
};
