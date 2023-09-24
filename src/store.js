import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

import { usuarioInfoReducer } from "./reducers/sesionReducers";

import { usuarioListaReducer } from "./reducers/usuarioReducers";

import { clienteListaReducer } from "./reducers/clienteReducers";

import { productoListaReducer } from "./reducers/productoReducers";

import {
  rutaListaReducer,
  rutaDetallesReducer,
  rutaActualizarReducer,
  rutaRegistrarReducer,
  rutaBorrarReducer,
  rutaDiasListaReducer,
  rutaDiaDetallesReducer,
  clientesRutaDiaReducer,
  rutaDiaActualizarReducer,
  rutaSalidaRutaListaReducer,
} from "./reducers/rutaReducers";

import {
  salidaRutaListaReducer,
  salidaRutaRegistrarReducer,
  salidaRutaDetallesReducer,
  salidaRutaVentaReducer,
} from "./reducers/salidaRutaReducers";

const middleware = [thunk];

const reducer = combineReducers({
  // Cuenta
  usuarioInfo: usuarioInfoReducer,
  // Usuario
  usuarioLista: usuarioListaReducer,
  // Productos
  productoLista: productoListaReducer,
  // Clientes
  clienteLista: clienteListaReducer,
  // Rutas
  rutaLista: rutaListaReducer,
  rutaDetalles: rutaDetallesReducer,
  rutaActualizar: rutaActualizarReducer,
  rutaRegistrar: rutaRegistrarReducer,
  rutaBorrar: rutaBorrarReducer,
  rutaDiasLista: rutaDiasListaReducer,
  rutaDiaDetalles: rutaDiaDetallesReducer,
  clientesRutaDia: clientesRutaDiaReducer,
  rutaDiaActualizar: rutaDiaActualizarReducer,
  rutaSalidaRutaLista: rutaSalidaRutaListaReducer,
  // Saluda Ruta
  salidaRutaLista: salidaRutaListaReducer,
  salidaRutaDetalles: salidaRutaDetallesReducer,
  salidaRutaRegistrar: salidaRutaRegistrarReducer,
  salidaRutaVenta: salidaRutaVentaReducer,
});

const token = localStorage.getItem("accessToken")
  ? JSON.parse(localStorage.getItem("accessToken"))
  : null;

const initialState = {
  usuarioInfo: {
    token,
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
