import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";
import { RESET_SALIDA_RUTA_REGISTRAR } from "../constantes/salidaRutaConstantes";
import VentanaMostrarSalidaRuta from "../componentes/VentanaMostrarSalidaRuta";
import FormularioProductoSalidaRuta from "../componentes/FormularioProductoSalidaRuta";
import { pedirProductosLista } from "../actions/productoActions";
import { registrarSalidaRuta } from "../actions/salidaRutaActions";

const RealizarSalidaRutaProductos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // La variable salidaRutaClientes se vuelve a crear cada vez que se llama el componente
  const salidaRutaClientes = localStorage.getItem("salidaRuta")
    ? JSON.parse(localStorage.getItem("salidaRuta"))
    : null;

  const productoLista = useSelector((state) => state.productoLista);
  const { loading, productos, error } = productoLista;

  const salidaRutaRegistrar = useSelector((state) => state.salidaRutaRegistrar);

  const {
    loading: loadingRegistrar,
    salidaRuta,
    error: errorRegistrar,
  } = salidaRutaRegistrar;

  const [desabilitarSalidaRuta, setDesabilitarSalidaRuta] = useState(true);
  const [mostrarSalidaRuta, setMostrarSalidaRuta] = useState(false);

  const {
    productosDisponibles,
    productosSalidaRuta,
    setProductosDisponibles,
    manejarSeleccionarProducto,
    manejarCambioCantidad,
    manejarConfirmarProducto,
    manejarCancelarProducto,
  } = useProductos(setDesabilitarSalidaRuta);

  useEffect(() => {
    const salidaRutaClientes = localStorage.getItem("salidaRuta")
      ? JSON.parse(localStorage.getItem("salidaRuta"))
      : null;
    if (!salidaRutaClientes) {
      navigate("/realizar-salida-ruta/clientes");
    }
  }, [navigate]);

  useEffect(() => {
    if (salidaRuta) {
      setMostrarSalidaRuta(true);
    }

    if (!productos) {
      dispatch(pedirProductosLista());
    } else {
      setProductosDisponibles(productos);
    }
  }, [dispatch, productos, navigate, setProductosDisponibles, salidaRuta]);

  const manejarRealizarSalidaRuta = (e) => {
    e.preventDefault();

    alert("realizando salida ruta");
    const nuevosProductosSalidaRuta =
      crearProductosSalidaRuta(productosSalidaRuta);

    const salidaRutaProductos = {
      ...salidaRutaClientes,
      salidaRutaProductos: nuevosProductosSalidaRuta,
      STATUS: "PENDIENTE",
    };
    dispatch(registrarSalidaRuta(salidaRutaProductos));
  };

  const manejarCerrarVentana = () => {
    setMostrarSalidaRuta(false);
    dispatch({ type: RESET_SALIDA_RUTA_REGISTRAR });
    localStorage.removeItem("salidaRuta");
    navigate("/salida-rutas");
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Mensaje variant="danger">{error}</Mensaje>
  ) : (
    productos && (
      <div style={{ padding: "25px", width: "100%" }}>
        {loadingRegistrar && <Loader />}
        {errorRegistrar && <Mensaje variant="danger">{error}</Mensaje>}
        {/* Esta es la parte que cambia en las paginas */}
        <h1>Realizar Salida Ruta</h1>
        <Form onSubmit={manejarRealizarSalidaRuta}>
          <Row>
            <Col md={5}>
              <Form.Group controlId="productosCliente">
                <Form.Label>PRODUCTOS DE DISPONIBLES</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={0}
                  onChange={(e) =>
                    manejarSeleccionarProducto(Number(e.target.value))
                  }
                >
                  <option value={0}>Selecciona un producto</option>
                  {productosDisponibles.map((pd) => (
                    <option key={pd.id} value={pd.id}>
                      {pd.NOMBRE}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Button disabled={desabilitarSalidaRuta} type="submit">
                Realizar Salida Ruta
              </Button>
            </Col>
            <Col md={7}>
              {productosSalidaRuta.map((ps) => (
                <FormularioProductoSalidaRuta
                  key={ps.id}
                  producto={ps}
                  manejarCambioCantidad={manejarCambioCantidad}
                  manejarConfirmarProducto={manejarConfirmarProducto}
                  manejarCancelarProducto={manejarCancelarProducto}
                />
              ))}
            </Col>
          </Row>
        </Form>
        {/* Mostrar salida ruta */}
        {mostrarSalidaRuta && (
          <VentanaMostrarSalidaRuta
            salidaRuta={salidaRuta}
            mostrarSalidaRuta={mostrarSalidaRuta}
            manejarCerrarVentana={manejarCerrarVentana}
          />
        )}
      </div>
    )
  );
};

const useProductos = (setDesabilitarSalidaRuta) => {
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [productosSalidaRuta, setProductosSalidaRuta] = useState([]);

  const manejarDesabilitarSalidaRuta = (nuevosProductosSalidaRuta) => {
    setDesabilitarSalidaRuta(
      !(
        nuevosProductosSalidaRuta.length > 0 &&
        nuevosProductosSalidaRuta.every((p) => p.confirmado) &&
        nuevosProductosSalidaRuta.every((p) => p.cantidadSalidaRuta > 0)
      )
    );
  };

  const manejarSeleccionarProducto = (productoId) => {
    const productoSeleccionado = productosDisponibles.find(
      (p) => p.id === productoId
    );

    const productoActualizado = {
      ...productoSeleccionado,
      confirmado: false,
      cantidadSalidaRuta: 0,
    };

    const nuevosProductosDisponibles = productosDisponibles.filter(
      (p) => p.id !== productoId
    );
    setProductosDisponibles(nuevosProductosDisponibles);

    const nuevosProductosSalidaRuta = [
      productoActualizado,
      ...productosSalidaRuta,
    ];
    setProductosSalidaRuta(nuevosProductosSalidaRuta);

    manejarDesabilitarSalidaRuta(nuevosProductosSalidaRuta);
  };

  const manejarCambioCantidad = (nuevaCantidad, productoId) => {
    // Obtener el index del producto cuya camtodad hay que cambiar

    const productoSeleccionado = productosSalidaRuta.find(
      (pv) => pv.id === productoId
    );

    const cantidadDisponible = productoSeleccionado.CANTIDAD;
    if (nuevaCantidad > cantidadDisponible) {
      alert(
        `La cantidad seleccionada debe ser inferior a ${cantidadDisponible}`
      );
    } else {
      const indexProducto = productosSalidaRuta.findIndex(
        (producto) => producto.id === productoId
      );

      // Crear una copia del arreglo de productos
      const nuevosProductosSalidaRuta = [...productosSalidaRuta];

      // Actualizar el precio con el index seleccionado
      nuevosProductosSalidaRuta[indexProducto] = {
        ...productosSalidaRuta[indexProducto],
        cantidadSalidaRuta: nuevaCantidad,
      };

      setProductosSalidaRuta(nuevosProductosSalidaRuta);
    }
  };

  const manejarConfirmarProducto = (productoId) => {
    const nuevosProductosSalidaRuta = productosSalidaRuta.map((p) => {
      if (p.id === productoId) {
        p.confirmado = !p.confirmado;
      }
      return p;
    });

    setProductosSalidaRuta(nuevosProductosSalidaRuta);

    manejarDesabilitarSalidaRuta(nuevosProductosSalidaRuta);
  };

  const manejarCancelarProducto = (productoId) => {
    const productoSeleccionado = {
      ...productosSalidaRuta.find((p) => p.id === productoId),
    };

    const nuevosProductosSalidaRuta = productosSalidaRuta.filter(
      (p) => p.id !== productoId
    );
    setProductosSalidaRuta(nuevosProductosSalidaRuta);

    const nuevosProductosDisponibles = [
      productoSeleccionado,
      ...productosDisponibles,
    ];
    setProductosDisponibles(nuevosProductosDisponibles);
  };

  return {
    productosDisponibles,
    productosSalidaRuta,
    setProductosDisponibles,
    manejarSeleccionarProducto,
    manejarCambioCantidad,
    manejarConfirmarProducto,
    manejarCancelarProducto,
  };
};

const crearProductosSalidaRuta = (productosSalidaRuta) => {
  const nuevosProductosSalidaRuta = productosSalidaRuta.map((pv) => {
    const productoId = pv.id;

    const cantidadSalidaRuta = pv.cantidadSalidaRuta;

    return { productoId, cantidadSalidaRuta };
  });

  return nuevosProductosSalidaRuta;
};

export default RealizarSalidaRutaProductos;
