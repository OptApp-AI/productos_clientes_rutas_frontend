import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pedirProductosLista } from "../actions/productoActions";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";

const Delete = () => {
  const dispatch = useDispatch();
  const productoLista = useSelector((state) => state.productoLista);

  const { loading, productos, error } = productoLista;

  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  useEffect(() => {
    if (!productos) {
      dispatch(pedirProductosLista());
    } else {
      setProductosSeleccionados(productos);
    }
  }, [productos, dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Mensaje>{error}</Mensaje>
  ) : (
    productos && (
      <div>
        {productosSeleccionados.map((p) => (
          <p>{p.NOMBRE}</p>
        ))}
      </div>
    )
  );
};

export default Delete;
