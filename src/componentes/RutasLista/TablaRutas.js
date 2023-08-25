import React from 'react'

import { useMediaQuery } from 'react-responsive';
import { TableStyled } from './styles/TablaRutas.styles';
import { Button } from 'react-bootstrap'


const TablaRutas = ({
  rutas,
  manejarRutaDetalles,
  manejarBorrarRuta
}) => {
  // Determinar si el ancho de la pantalla es small o menor
  const isSmallViewport = useMediaQuery({ maxWidth: 768 });
  const shouldShow = !isSmallViewport;

  // Verificar si es administrador para renderizar algunas propiedades
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  // Renderizar tabla de rutas
  return (
    <TableStyled striped hover>

      <thead>
        <tr>
          {shouldShow ? (
            <>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>DIA</th>
              <th>REPARTIDOR</th>
            </>
          ) :
            <>
              <th>NOMBRE</th>
            </>}

          <th>EDITAR</th>
          {isAdmin && <th>BORRAR</th>}
        </tr>
      </thead>

      <tbody>
        {rutas.map((r) => (
          <tr key={r.id} onClick={() => manejarRutaDetalles(r.id)}>

            {shouldShow ? (
              <>
                <td>{r.id}</td>
                <td>{r.NOMBRE}</td>
                <td>{r.DIA}</td>
                <td>{r.REPARTIDOR}</td>
              </>
            ) : 
              <>
                <td>{r.NOMBRE}</td>
              </>}
            <td>
              <Button onClick={() => manejarRutaDetalles(r.id)}>
                <i className="fa-solid fa-circle-info"></i>
              </Button>
            </td>
            { isAdmin && 
            <td>
              <Button
                variant="danger"
                onClick={() => manejarBorrarRuta(r.id)}
              >
                <i className="fa-solid fa-trash"></i>
              </Button>
            </td> }
          </tr>
        ))}
      </tbody>


    </TableStyled>
  );
};

export default TablaRutas;