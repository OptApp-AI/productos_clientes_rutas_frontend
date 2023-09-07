import { useEffect, useState } from 'react';
import { pedirRutasLista } from '../../actions/rutaActions';

// Funcion para mostrar ventana con detalles de la ruta
export const useMostrarDetallesRuta = (dispatch, rutas) => {
    // Estado de la ventana emergente con la informacion de la ruta
    const [mostrarRuta, setMostrarRuta] = useState(false);
    // Estado para guardar la informacion de la ruta
    const [ruta, setRuta] = useState({});

    // useEffect para obtener las rutas del Redux store
    useEffect(() => {
        // Si no hay rutas, disparar la accion de pedir rutas
        if(!rutas) {
            dispatch(pedirRutasLista());
        }
    }, [dispatch, rutas]);


    // Funcion para cerrar la ventana emergente con la informacion de la ruta
    const manejarCerrarVentana = () => {
        setMostrarRuta(false);
    };

    // Funcion para mostrar la ventana emergente con la informacion de la ruta
    const manejarMostrarDetallesRuta = (rutaId) => {
        // Encontrar la ruta con el 'id' del elemento mostrado en la tabla de rutas
        const rutaSeleccionada = {
            ...rutas.find((r) => r.id === rutaId),
        };
        setRuta(rutaSeleccionada);
        setMostrarRuta(true);
    };

    return {
        mostrarRuta,
        ruta,
        manejarCerrarVentana,
        manejarMostrarDetallesRuta
    };
};