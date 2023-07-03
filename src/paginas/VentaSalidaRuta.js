import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { registrarVenta } from "../actions/ventaActions";
import FormularioProductoVenta from "../componentes/FormularioProductoVenta";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";
// import VentanaMostrarVenta from "../componentes/VentanaMostrarVenta";
// import { RESET_VENTA_REGISTRAR } from "../constantes/ventaConstantes";
import jwt_decode from "jwt-decode";
import {
  obtenerSalidaRutaDetalles,
  registrarSalidaRutaVenta,
} from "../actions/salidaRutaActions";
import { RESET_SALIDA_RUTA_VENTA } from "../constantes/salidaRutaConstantes";

const RealizarVenta = ({ match }) => {
  const params = useParams(match);

  const salidaRutaId = params.id;

  const usuarioInfo = useSelector((state) => state.usuarioInfo);
  const { tokens } = usuarioInfo;

  const salidaRutaDetalles = useSelector((state) => state.salidaRutaDetalles);
  const { error, salidaRuta, loading } = salidaRutaDetalles;

  const salidaRutaVenta = useSelector((state) => state.salidaRutaVenta);
  const {
    loading: loadingSRVenta,
    success: successSRVenta,
    error: errorSRVenta,
  } = salidaRutaVenta;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [vendedor, setVendedor] = useState("");
  //   Se obtienen de la salidaRuts
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({});
  //   Lo mismo
  const [productosCliente, setProductosCliente] = useState([]);
  //   Otros estados
  const [productosVenta, setProductosVenta] = useState([]);
  const [tipoVenta, setTipoVenta] = useState("RUTA");
  //   const [tipoPago, setTipoPago] = useState("CONTADO");
  //   const [status, setStatus] = useState("PENDIENTE");
  const [observaciones, setObservaciones] = useState("NO APLICA");
  const [desabilitarVenta, setDesabilitarVenta] = useState(true);
  const [mostrarVenta, setMostrarVenta] = useState(false);

  useEffect(() => {
    if (!tokens) {
      navigate("/login");
    } else {
      // Obtener el usrname a partir del token
      var decoded = jwt_decode(tokens.access);
      setVendedor(decoded.username);
    }
    if (successSRVenta) {
      dispatch({ type: RESET_SALIDA_RUTA_VENTA });
      navigate("/salida-rutas");
    }
  }, [navigate, dispatch, tokens, salidaRutaVenta]);

  useEffect(() => {
    if (!salidaRuta || salidaRuta.id !== Number(salidaRutaId)) {
      dispatch(obtenerSalidaRutaDetalles(salidaRutaId));
    } else {
      const clientes = crearClientesVenta(salidaRuta);
      setClientes(clientes);
      setCliente(clientes[0]);
      setProductosCliente(clientes[0].precios_cliente);
    }
  }, [dispatch, salidaRuta, salidaRutaId]);

  const manejarCambiarCliente = (clienteId) => {
    const clienteSeleccionado = { ...clientes.find((c) => c.id === clienteId) };

    setCliente(clienteSeleccionado);

    setProductosCliente(clienteSeleccionado.precios_cliente);

    setProductosVenta([]);
  };

  const manejarDesabilitarVenta = (nuevosProductosVenta) => {
    setDesabilitarVenta(
      !(
        nuevosProductosVenta.length > 0 &&
        nuevosProductosVenta.every((p) => p.confirmado) &&
        nuevosProductosVenta.every((p) => p.cantidadVenta > 0)
      )
    );
  };

  const manejarSeleccionarProducto = (productoId) => {
    const productoSeleccionado = productosCliente.find(
      (p) => p.id === productoId
    );

    const productoActualizado = {
      ...productoSeleccionado,
      confirmado: false,
      cantidadVenta: 0,
    };

    const nuevosProductosCliente = productosCliente.filter(
      (p) => p.id !== productoId
    );
    setProductosCliente(nuevosProductosCliente);

    const nuevosProductosVenta = [productoActualizado, ...productosVenta];
    setProductosVenta(nuevosProductosVenta);

    manejarDesabilitarVenta(nuevosProductosVenta);
  };

  const manejarCambioCantidad = (nuevaCantidad, productoId) => {
    // Obtener el index del producto cuya camtodad hay que cambiar

    const productoSeleccionado = productosVenta.find(
      (pv) => pv.id === productoId
    );

    const cantidadDesponible = productoSeleccionado.producto_cantidad;
    if (nuevaCantidad > cantidadDesponible) {
      alert(
        `La cantidad seleccionada debe ser inferior a ${cantidadDesponible}`
      );
    } else {
      const indexProducto = productosVenta.findIndex(
        (producto) => producto.id === productoId
      );

      // Crear una copia del arreglo de productos
      const nuevosProductosVenta = [...productosVenta];

      // Actualizar el precio con el index seleccionado
      nuevosProductosVenta[indexProducto] = {
        ...productosVenta[indexProducto],
        cantidadVenta: nuevaCantidad,
      };

      setProductosVenta(nuevosProductosVenta);
    }
  };

  const manejarConfirmarProducto = (productoId) => {
    const nuevosProductosVenta = productosVenta.map((p) => {
      if (p.id === productoId) {
        p.confirmado = !p.confirmado;
      }
      return p;
    });

    setProductosVenta(nuevosProductosVenta);

    manejarDesabilitarVenta(nuevosProductosVenta);
  };

  const manejarCancelarProducto = (productoId) => {
    const productoSeleccionado = {
      ...productosVenta.find((p) => p.id === productoId),
    };

    const nuevosProductosVenta = productosVenta.filter(
      (p) => p.id !== productoId
    );
    setProductosVenta(nuevosProductosVenta);

    const nuevosProductosCliente = [productoSeleccionado, ...productosCliente];
    setProductosCliente(nuevosProductosCliente);
  };

  const manejarRealizarVenta = (e) => {
    e.preventDefault();

    const nuevosProductosVenta = crearProductosVenta(productosVenta);

    // const monto = calcularMonto(nuevosProductosVenta);

    const salidaRutaVenta = {
      id: salidaRuta.id,
      productosVenta: nuevosProductosVenta,
      // VENDEDOR: vendedor,
      // MONTO: monto,
      // TIPO_VENTA: tipoVenta,
      // OBSERVACIONES: observaciones,
      clienteId: cliente.id,
    };
    console.log(salidaRutaVenta);

    dispatch(registrarSalidaRutaVenta(salidaRutaVenta));

    // dispatch(registrarVenta(venta));
  };

  const manejarCerrarVentana = () => {
    setMostrarVenta(false);
    // dispatch({ type: RESET_VENTA_REGISTRAR });
    // navigate("/ventas");
  };

  const manejarRegresar = () => {
    // dispatch({ type: RESET_SALIDA_RUTA_DETALLES });
    navigate("/salida-rutas");
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Mensaje variant="danger">{error}</Mensaje>
  ) : (
    clientes && (
      <div style={{ padding: "25px", width: "100%" }}>
        {loadingSRVenta && <Loader />}
        {errorSRVenta && <Mensaje variant="danger">{errorSRVenta}</Mensaje>}
        {/* Esta es la parte que cambia en las paginas */}
        <h1>Realizar venta | Salida Ruta #{salidaRutaId}</h1>
        <Button variant="primary" onClick={manejarRegresar}>
          Regresar
        </Button>
        <Form onSubmit={manejarRealizarVenta}>
          <Row>
            <Col md={5}>
              <Form.Group>
                <Form.Label>VENDEDOR</Form.Label>
                <Form.Control
                  readOnly
                  type="text"
                  value={vendedor}
                ></Form.Control>

                <Form.Group controlId="cliente">
                  <Form.Label>CLIENTE</Form.Label>
                  <Form.Control
                    as="select"
                    value={cliente.id}
                    onChange={(e) =>
                      manejarCambiarCliente(Number(e.target.value))
                    }
                  >
                    {clientes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form.Group>

              <Form.Group controlId="productosCliente">
                <Form.Label>PRODUCTOS DEL CLIENTE</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={0}
                  onChange={(e) =>
                    manejarSeleccionarProducto(Number(e.target.value))
                  }
                >
                  <option value={0}>Selecciona un producto</option>
                  {productosCliente.map((pc) => (
                    <option key={pc.id} value={pc.id}>
                      {pc.producto_nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="tipoVenta">
                <Form.Label>TIPO DE VENTA</Form.Label>
                <Form.Control
                  as="select"
                  value={tipoVenta}
                  onChange={(e) => setTipoVenta(e.target.value)}
                >
                  <option value="MOSTRADOR">Mostrador</option>
                  <option value="RUTA">Ruta</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="observaciones">
                <Form.Label>OBSERVACIONES</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button disabled={desabilitarVenta} type="submit">
                Realizar venta
              </Button>
            </Col>
            <Col md={7}>
              {productosVenta.map((pv) => (
                <FormularioProductoVenta
                  key={pv.id}
                  producto={pv}
                  manejarCambioCantidad={manejarCambioCantidad}
                  manejarConfirmarProducto={manejarConfirmarProducto}
                  manejarCancelarProducto={manejarCancelarProducto}
                />
              ))}
            </Col>
          </Row>
        </Form>
        {/* Mostrar venta */}
        {/* {mostrarVenta && (
          <VentanaMostrarVenta
            venta={venta}
            mostrarVenta={mostrarVenta}
            manejarCerrarVentana={manejarCerrarVentana}
          />
        )} */}
      </div>
    )
  );
};

const crearProductosVenta = (productosVenta) => {
  const nuevosProductosVenta = productosVenta.map((pv) => {
    const productoId = pv.id;

    const cantidadVenta = pv.cantidadVenta;

    // const precioVenta = pv.PRECIO * pv.cantidadVenta;

    return { productoId, cantidadVenta };
  });

  return nuevosProductosVenta;
};

const calcularMonto = (tipoPago, nuevosProductosVenta) => {
  if (tipoPago === "CORTESIA") {
    return 0;
  } else {
    const monto = nuevosProductosVenta.reduce(
      (total, pv) => pv.precioVenta + total,
      0
    );

    return monto;
  }
};

const crearClientesVenta = (salidaRuta) => {
  // Copiamos el objeto para no modificar el original
  const nuevaSalidaRuta = { ...salidaRuta };

  // Iteramos sobre los objetos precios_cliente en salida_ruta_clientes
  nuevaSalidaRuta.salida_ruta_clientes.forEach((cliente) => {
    cliente.precios_cliente.forEach((precio) => {
      // Buscamos el producto en salida_ruta_productos
      const producto = nuevaSalidaRuta.salida_ruta_productos.find(
        (prod) =>
          prod.producto_nombre === precio.producto_nombre &&
          prod.STATUS === "CARGADO"
      );
      if (producto) {
        // Si encontramos el producto, añadimos los campos correspondientes
        precio.id = producto.id;
        precio.producto_cantidad = producto.CANTIDAD_DISPONIBLE;
        precio.STATUS = producto.STATUS;
      } else {
        // Si no encontramos el producto, eliminamos el objeto de precios_cliente correspondiente
        cliente.precios_cliente = cliente.precios_cliente.filter(
          (p) => p.producto_nombre !== precio.producto_nombre
        );
      }
    });
  });

  return nuevaSalidaRuta.salida_ruta_clientes;
};

export default RealizarVenta;
