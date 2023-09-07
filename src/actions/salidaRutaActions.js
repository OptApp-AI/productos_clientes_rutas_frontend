import axios from "axios";
import { RESET_PRODUCTO_LISTA } from "../constantes/productoConstantes";
import {
  FAIL_SALIDA_RUTA_ACTUALIZAR,
  FAIL_SALIDA_RUTA_DETALLES,
  FAIL_SALIDA_RUTA_LISTA,
  FAIL_SALIDA_RUTA_REGISTRAR,
  FAIL_SALIDA_RUTA_VENTA,
  REQUEST_SALIDA_RUTA_ACTUALIZAR,
  REQUEST_SALIDA_RUTA_DETALLES,
  REQUEST_SALIDA_RUTA_LISTA,
  REQUEST_SALIDA_RUTA_REGISTRAR,
  RESET_SALIDA_RUTA_DETALLES,
  RESET_SALIDA_RUTA_LISTA,
  RESET_SALIDA_RUTA_VENTA,
  SUCCESS_SALIDA_RUTA_ACTUALIZAR,
  SUCCESS_SALIDA_RUTA_DETALLES,
  SUCCESS_SALIDA_RUTA_LISTA,
  SUCCESS_SALIDA_RUTA_REGISTRAR,
  SUCCESS_SALIDA_RUTA_VENTA,
} from "../constantes/salidaRutaConstantes";
// import { RESET_CLIENTE_LISTA } from "../constantes/clienteConstantes";
// import { RESET_PRODUCTO_LISTA } from "../constantes/productoConstantes";

// Creador de acciones para pedir los salidaRutas del backend
export const pedirSalidaRutasLista = () => async (dispatch, getState) => {
  dispatch({ type: REQUEST_SALIDA_RUTA_LISTA });

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
      "http://127.0.0.1:8000/api/salida-rutas/",
      config
    );

    dispatch({ type: SUCCESS_SALIDA_RUTA_LISTA, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_SALIDA_RUTA_LISTA, payload: error.message });
  }
};

// Creador de acciones para pedir el salidaRuta con el id del backend
export const obtenerSalidaRutaDetalles = (id) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_SALIDA_RUTA_DETALLES });

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
      `http://127.0.0.1:8000/api/salida-rutas/${id}/`,
      config
    );

    dispatch({ type: SUCCESS_SALIDA_RUTA_DETALLES, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_SALIDA_RUTA_DETALLES, payload: error.message });
  }
};

// Creador de acciones para actualizar salidaRuta del backend
export const actualizarSalidaRuta =
  (id, salidaRuta) => async (dispatch, getState) => {
    dispatch({ type: REQUEST_SALIDA_RUTA_ACTUALIZAR });

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
        `http://127.0.0.1:8000/api/modificar-salida-ruta/${id}/`,
        salidaRuta,
        config
      );

      dispatch({ type: SUCCESS_SALIDA_RUTA_ACTUALIZAR, payload: data });
      // dispatch({ type: RESET_SALIDA_RUTA_DETALLES });
      dispatch({ type: RESET_SALIDA_RUTA_LISTA });
      // dispatch({ type: RESET_PRODUCTO_LISTA });
      // dispatch({ type: RESET_CLIENTE_LISTA });
    } catch (error) {
      dispatch({ type: FAIL_SALIDA_RUTA_ACTUALIZAR, payload: error.message });
    }
  };

// Creador de acciones para registrar un nuevo salidaRuta en el backend
export const registrarSalidaRuta =
  (salidaRuta) => async (dispatch, getState) => {
    dispatch({ type: REQUEST_SALIDA_RUTA_REGISTRAR });

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
        "http://127.0.0.1:8000/api/crear-salida-ruta/",
        salidaRuta,
        config
      );

      dispatch({ type: SUCCESS_SALIDA_RUTA_REGISTRAR, payload: data });
      dispatch({ type: RESET_SALIDA_RUTA_LISTA });
      dispatch({ type: RESET_PRODUCTO_LISTA });
      // dispatch({ type: RESET_CLIENTE_LISTA });
    } catch (error) {
      dispatch({ type: FAIL_SALIDA_RUTA_REGISTRAR, payload: error.message });
    }
  };

export const registrarSalidaRutaVenta =
  (salidaRutaVenta) => async (dispatch, getState) => {
    dispatch({ type: RESET_SALIDA_RUTA_VENTA });

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
        `http://127.0.0.1:8000/api/venta-salida-ruta/${salidaRutaVenta.id}/`,
        salidaRutaVenta,
        config
      );

      dispatch({ type: SUCCESS_SALIDA_RUTA_VENTA });
      dispatch({ type: RESET_SALIDA_RUTA_DETALLES });
      dispatch({ type: RESET_SALIDA_RUTA_LISTA });
      dispatch({ type: RESET_PRODUCTO_LISTA });
    } catch (error) {
      dispatch({ type: FAIL_SALIDA_RUTA_VENTA, payload: error.message });
    }
  };
