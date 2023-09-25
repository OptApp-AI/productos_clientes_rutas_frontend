import React from "react";

import { useMediaQuery } from "react-responsive";
import { TableStyled } from "./styles/TablaRutas.styles";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TablaRutas = ({
  rutas,
  manejarMostrarDetallesRuta,
  manejarRutaDetalles,
  manejarBorrarRuta,
}) => {
  // Determinar si el ancho de la pantalla es small o menor
  const isSmallViewport = useMediaQuery({ maxWidth: 768 });
  const shouldShow = !isSmallViewport;

  const navigate = useNavigate();

  // Verificar si es administrador para renderizar algunas propiedades
  const isAdmin = true;

  const manejarRutaDias = (rutaId) => {
    navigate(`/rutas/${rutaId}/dias/`);
  };

  // Renderizar tabla de rutas
  return (
    <TableStyled striped hover>
      <thead>
        <tr>
          {shouldShow ? (
            <>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>REPARTIDOR</th>
            </>
          ) : (
            <>
              <th>NOMBRE</th>
            </>
          )}

          <th>EDITAR</th>
          <th>Detalles</th>
          {isAdmin && <th>BORRAR</th>}
        </tr>
      </thead>

      <tbody>
        {rutas.map((r) => (
          <tr key={r.id} onClick={() => manejarMostrarDetallesRuta(r.id)}>
            {shouldShow ? (
              <>
                <td>{r.id}</td>
                <td>{r.NOMBRE}</td>
                <td>{r.REPARTIDOR_NOMBRE}</td>
              </>
            ) : (
              <>
                <td>{r.NOMBRE}</td>
              </>
            )}
            <td>
              <Button onClick={() => manejarRutaDetalles(r.id)}>
                <i className="fa-solid fa-circle-info"></i>
              </Button>
            </td>
            <td>
              <Button onClick={() => manejarRutaDias(r.id)}>
                <i className="fa-solid fa-circle-info"></i>
              </Button>
            </td>
            {isAdmin && (
              <td>
                <Button
                  variant="danger"
                  onClick={(e) => manejarBorrarRuta(e, r.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </TableStyled>
  );
};

export default TablaRutas;
