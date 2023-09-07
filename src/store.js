import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

import { usuarioInfoReducer } from "./reducers/usuarioReducers";

import { clienteListaReducer } from "./reducers/clienteReducers";

import { productoListaReducer } from "./reducers/productoReducers";

import {
  rutaListaReducer,
  rutaDetallesReducer,
  rutaActualizarReducer,
  rutaRegistrarReducer,
} from "./reducers/rutaReducers";

import {
  salidaRutaListaReducer,
  salidaRutaRegistrarReducer,
  salidaRutaDetallesReducer,
  salidaRutaVentaReducer,
} from "./reducers/salidaRutaReducers";

const middleware = [thunk];

const reducer = combineReducers({
  // Usuario
  usuarioInfo: usuarioInfoReducer,
  // Productos
  productoLista: productoListaReducer,
  // Clientes
  clienteLista: clienteListaReducer,
  // Rutas
  rutaLista: rutaListaReducer,
  rutaDetalles: rutaDetallesReducer,
  rutaActualizar: rutaActualizarReducer,
  rutaRegistrar: rutaRegistrarReducer,
  // Saluda Ruta
  salidaRutaLista: salidaRutaListaReducer,
  salidaRutaDetalles: salidaRutaDetallesReducer,
  salidaRutaRegistrar: salidaRutaRegistrarReducer,
  salidaRutaVenta: salidaRutaVentaReducer,
});

const tokens = localStorage.getItem("tokens")
  ? JSON.parse(localStorage.getItem("tokens"))
  : null;

const initalState = {
  usuarioInfo: {
    tokens,
  },
};

const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
