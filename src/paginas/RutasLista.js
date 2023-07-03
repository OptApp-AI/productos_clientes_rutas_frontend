import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { borrarRuta, pedirRutasLista } from "../actions/rutaActions";
import { pedirRutasLista } from "../actions/rutaActions";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";
// import {
//   RESET_RUTA_BORRAR,
//   RESET_RUTA_DETALLES,
// } from "../constantes/rutaConstantes";

import { RESET_RUTA_DETALLES } from "../constantes/rutaConstantes";

const RutasLista = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Funcion para nevagar en la aplicacion
  const navigate = useNavigate();
  // Obtener el estado desde el Redux store
  const rutaLista = useSelector((state) => state.rutaLista);
  const { loading, rutas, error } = rutaLista;

  // Obtener el estado desde el Redux sotore
  //   const productoBorrar = useSelector((state) => state.productoBorrar);
  //   const {
  //     loading: loadingBorrar,
  //     success: successBorrar,
  //     error: errorBorrar,
  //   } = productoBorrar;

  useEffect(() => {
    // if (successBorrar) {
    //   dispatch({ type: RESET_PRODUCTO_BORRAR });
    //   alert("La eliminación fue exitosa");
    // }

    // Si no hay rutas, disparar la accion de pedir rutas
    if (!rutas) {
      dispatch(pedirRutasLista());
    }
  }, [dispatch, rutas]);

  const manejarRutaDetalles = (id) => {
    // Redireccionar a la pagina del rutas
    dispatch({ type: RESET_RUTA_DETALLES });
    navigate(`/rutas/${id}`);
  };

  // YO DIGO QUE NO DEBERIA SER POSIBLE BORRAR RUTAS
  const manejarBorrarRuta = (id) => {
    if (window.confirm("¿Está seguro de eliminar este producto")) {
      //   dispatch(borrarProducto(id));
      alert(`Ruta id: ${id}`);
    } else {
      alert("Operación cancelada");
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Mensaje variant="danger">{error}</Mensaje>
  ) : (
    rutas && (
      <div style={{ padding: "25px" }}>
        {/* {loadingBorrar && <Loader />} */}
        {/* {errorBorrar && <Mensaje variant="danger">{errorBorrar}</Mensaje>} */}
        {/* Esta el la parte que cambia en las paginas */}
        <h1>Rutas</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>DIA</th>
              <th>REPARTIDOR</th>
              <th>EDITAR</th>
              <th>BORRAR</th>
            </tr>
          </thead>
          <tbody>
            {rutas.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.NOMBRE}</td>
                <td>{r.DIA}</td>
                <td>{r.REPARTIDOR}</td>
                <td>
                  <Button onClick={() => manejarRutaDetalles(r.id)}>
                    <i className="fa-solid fa-circle-info"></i>
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => manejarBorrarRuta(r.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  );
};

export default RutasLista;
