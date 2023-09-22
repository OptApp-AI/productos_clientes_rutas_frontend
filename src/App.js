import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Encabezado from "./componentes/general/Encabezado";
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
import RutaDiasLista from "./paginas/RutaDiasLista";
import SalidaRutaDetalles from "./paginas/SalidaRutaDetalles";
import SalidaRutasLista from "./paginas/SalidaRutasLista";
import VentaSalidaRuta from "./paginas/VentaSalidaRuta";
import Resumen from "./paginas/Resumen";
import GlobalStyles from "./GlobalStyles";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import RutaDiasDetalles from "./paginas/RutaDiasDetalles";

function App() {
  // Obtener informacion del usuario desde el Redux store
  const usuarioInfo = useSelector((state) => state.usuarioInfo);
  const { token } = usuarioInfo;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  return (
    <div className="App">
      <GlobalStyles />
      <BrowserRouter>
        <Encabezado />
        <Routes>
          {isAuthenticated ? (
            <>
              {/* Home */}
              <Route path="/" element={<Home />} />
              {/* Rutas */}
              <Route path="/rutas" element={<RutasLista />} />
              <Route path="/rutas/:id" element={<RutaDetalles />} />
              <Route path="/rutas/:id/dias" element={<RutaDiasLista />} />
              <Route path="/rutas-dias/:id" element={<RutaDiasDetalles />} />
              <Route path="/registrar-ruta" element={<RegistrarRuta />} />
              {/* Salida a Rutas */}
              <Route path="/salida-rutas" element={<SalidaRutasLista />} />
              <Route
                path="/salida-rutas/:id"
                element={<SalidaRutaDetalles />}
              />
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
              <Route
                path="/devoluciones/:id"
                element={<DevolucionDetalles />}
              />
              <Route
                path="/realizar-devolucion"
                element={<RealizarDevolucion />}
              />
              <Route
                path="/venta-salida-ruta/:id"
                element={<VentaSalidaRuta />}
              />
              <Route path="/resumen" element={<Resumen />} />
            </>
          ) : (
            // Inicio sesion
            <Route path="/login" element={<InicioSesion />} />
          )}
          {/* Home */}
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
