import { BrowserRouter, Routes, Route } from "react-router-dom";
import Encabezado from "./componentes/Encabezado";
import Delete from "./paginas/Delete";
import DevolucionDetalles from "./paginas/DevolucionDetalles";
import DevolucionesLista from "./paginas/DevolucionesLista";
import Home from "./paginas/Home";
import InicioSesion from "./paginas/InicioSesion";
import RealizarDevolucion from "./paginas/RealizarDevolucion";
import RealizarSalidaRutaClientes from "./paginas/RealizarSalidaRutaClientes";
import RealizarSalidaRutaProductos from "./paginas/RealizarSalidaRutaProductos";
import RegistrarRuta from "./paginas/RegistrarRuta";
import RutaDetalles from "./paginas/RutaDetalles";
import RutasLista from "./paginas/RutasLista";
import SalidaRutaDetalles from "./paginas/SalidaRutaDetalles";
import SalidaRutasLista from "./paginas/SalidaRutasLista";
import VentaSalidaRuta from "./paginas/VentaSalidaRuta";

import GlobalStyles from './GlobalStyles'

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <BrowserRouter>
        <Encabezado />
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />
          {/* Inicio sesion */}
          <Route path="/login" element={<InicioSesion />} />
          {/* Rutas */}
          <Route path="/rutas" element={<RutasLista />} />
          <Route path="/rutas/:id" element={<RutaDetalles />} />
          <Route path="/registrar-ruta" element={<RegistrarRuta />} />
          {/* Salida a Rutas */}
          <Route path="/salida-rutas" element={<SalidaRutasLista />} />
          <Route path="/salida-rutas/:id" element={<SalidaRutaDetalles />} />
          <Route
            path="/realizar-salida-ruta/clientes"
            element={<RealizarSalidaRutaClientes />}
          />
          <Route
            path="/realizar-salida-ruta/productos"
            element={<RealizarSalidaRutaProductos />}
          />
          {/* Devoluciones */}
          <Route path="/devoluciones" element={<DevolucionesLista />} />
          <Route path="/devoluciones/:id" element={<DevolucionDetalles />} />
          <Route path="/realizar-devolucion" element={<RealizarDevolucion />} />

          <Route path="/venta-salida-ruta/:id" element={<VentaSalidaRuta />} />

          <Route path="/borrar" element={<Delete />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
