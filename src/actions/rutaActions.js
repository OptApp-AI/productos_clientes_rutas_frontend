import axios from "axios";
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
  RESET_RUTA_DIA_LISTA,
  RESET_RUTA_LISTA,
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
import { RESET_CLIENTE_LISTA } from "../constantes/clienteConstantes";

// Si edito una ruta los clientes deben ser actualizados para que tengan los valores actualizados de sus rutas
// import { RESET_CLIENTE_LISTA } from "../constantes/clienteConstantes";

// No veo porque sesetear la lista de ventas al modificar las rutas
// import { RESET_VENTA_LISTA } from "../constantes/ventaConstantes";

// Recuerda anadir la posibilidad de remover todos los clientes asociados con una ruta o un conjunto de rutas (este ultimo caso seria aplicable para eliminar los clientes en los siete dias de la semana de una ruta)

// Creador de acciones para pedir las rutas del backend
export const pedirRutasLista = () => async (dispatch, getState) => {
  dispatch({ type: REQUEST_RUTA_LISTA });

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

    const { data } = await axios.get("/api/rutas/", config);

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
      usuarioInfo: { token },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/rutas/${id}/`, config);

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
      usuarioInfo: { token },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `/api/modificar-ruta/${ruta.id}/`,
      ruta,
      config
    );

    dispatch({ type: SUCCESS_RUTA_ACTUALIZAR });
    dispatch({ type: RESET_RUTA_LISTA });
    dispatch({ type: RESET_RUTA_DIA_LISTA });
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
      usuarioInfo: { token },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post("/api/crear-ruta/", ruta, config);

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
      usuarioInfo: { token },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`/api/modificar-ruta/${id}/`, config);

    dispatch({ type: SUCCESS_RUTA_BORRAR });
    dispatch({ type: RESET_RUTA_LISTA });
    // Debo volver a pedir la lista de clientes del bakcend
    dispatch({ type: RESET_CLIENTE_LISTA });
    // Debo volver a pedir la lista de ventas del backend
    // dispatch({ type: RESET_VENTA_LISTA });
  } catch (error) {
    dispatch({ type: FAIL_RUTA_BORRAR, payload: error.message });
  }
};

export const pedirRutaDiasLista = (rutaId) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_RUTA_DIA_LISTA });

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

    const { data } = await axios.get(`/api/rutas/${rutaId}/dias/`, config);

    dispatch({ type: SUCCESS_RUTA_DIA_LISTA, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_RUTA_DIA_LISTA, payload: error.message });
  }
};

// Creador de acciones para pedir la ruta dia con el id del backend
export const obtenerRutaDiaDetalles =
  (rutaId) => async (dispatch, getState) => {
    dispatch({ type: REQUEST_RUTA_DIA_DETALLES });

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
      const { data } = await axios.get(`/api/ruta-dias/${rutaId}`, config);

      dispatch({ type: SUCCESS_RUTA_DIA_DETALLES, payload: data });
    } catch (error) {
      dispatch({ type: FAIL_RUTA_DIA_DETALLES, payload: error.message });
    }
  };

export const obtenerClientesRutaDia =
  (rutaDiaId) => async (dispatch, getState) => {
    dispatch({ type: REQUEST_RUTA_DIA_CLIENTES });

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

      const { data } = await axios.get(
        `/api/ruta-dias/${rutaDiaId}/clientes/`,
        config
      );

      dispatch({
        type: SUCCESS_RUTA_DIA_CLIENTES,
        payload: data.clientes_ruta,
      });
    } catch (error) {
      dispatch({ type: FAIL_RUTA_DIA_CLIENTES, payload: error.message });
    }
  };

export const actualizarRutaDia = (ruta) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_RUTA_DIA_ACTUALIZAR });

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

    const { data } = await axios.put(
      `/api/modificar-ruta-dia/${ruta.id}/`,
      ruta,
      config
    );

    dispatch({ type: SUCCESS_RUTA_DIA_ACTUALIZAR });
    dispatch({ type: RESET_RUTA_DIA_LISTA });
    dispatch({ type: RESET_RUTA_LISTA });
    // Debo volver a pedir la lista de clientes del bakcend
    // dispatch({ type: RESET_CLIENTE_LISTA });
    // Debo volver a pedir la lista de ventas del backend
    // dispatch({ type: RESET_VENTA_LISTA });
  } catch (error) {
    dispatch({ type: FAIL_RUTA_DIA_ACTUALIZAR, payload: error.message });
  }
};

export const pedirRutasSalidaRutaLista = () => async (dispatch, getState) => {
  dispatch({ type: REQUEST_RUTA_SALIDA_RUTA_LISTA });

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

    const { data } = await axios.get("/api/rutas-salida-ruta/", config);

    dispatch({ type: SUCCESS_RUTA_SALIDA_RUTA_LISTA, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_RUTA_SALIDA_RUTA_LISTA, payload: error.message });
  }
};
