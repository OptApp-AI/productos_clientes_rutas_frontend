import React from 'react'

import { useMediaQuery } from 'react-responsive';
import { TableStyled } from './styles/TablaSalidasRuta.styles';
import { Button } from 'react-bootstrap';

const TablaSalidasRuta = ({
  salidaRutas,
  manejarMostrarDetallesSalidaRuta,
  formatearFecha,
  manejarSalidaRutaDetalles,
  manejarSalidaRutaVenta
}) => {

  // Determinar si el ancho de la pantalla es small o menor
  const isSmallViewport = useMediaQuery({ maxWidth: 768 });
  const shouldShow = !isSmallViewport;

  // Verificar si es administrador para renderizar algunas propiedades
  const isAdmin = false

  // Renderizar la tabla de salidas a ruta
  return (
    <TableStyled striped hover>
      <thead>
            <tr>
              <th>ID</th>
              <th>ATIENDE</th>
              <th>REPARTIDOR</th>
              <th>FECHA</th>
              <th>STATUS</th>
              <th>EDITAR</th>
              <th>DEVOLUCION</th>
              <th>VENTA</th>
              <th>AVISO DE VISITA</th>
              <th>RESUMEN/CORTE</th>
            </tr>
          </thead>
          <tbody>
            {salidaRutas.map((sr) => (
              <tr
                key={sr.id}
                onClick={() => manejarMostrarDetallesSalidaRuta(sr.id)}
              >
                <td>{sr.id}</td>
                <td>{sr.ATIENDE}</td>
                <td>{sr.REPARTIDOR}</td>
                <td>{formatearFecha(sr.FECHA)}</td>
                <td>{sr.STATUS}</td>
                <td>
                  <Button onClick={() => manejarSalidaRutaDetalles(sr.id)}>
                    <i className="fa-solid fa-circle-info"></i>
                  </Button>
                </td>
                <td>
                  <Button onClick={() => manejarSalidaRutaDetalles(sr.id)}>
                    <i className="fa-solid fa-rotate-left"></i>
                  </Button>
                </td>

                <td>
                  <Button onClick={(e) => manejarSalidaRutaVenta(e, sr.id)}>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </Button>
                </td>
                <td>
                  <Button onClick={(e) => manejarSalidaRutaVenta(e, sr.id)}>
                    <i className="fa-solid fa-file-signature"></i>
                  </Button>
                </td>
                <td>
                  <Button onClick={(e) => manejarSalidaRutaVenta(e, sr.id)}>
                    <i class="fa-solid fa-receipt"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
    </TableStyled>
  );
};

export default TablaSalidasRuta;