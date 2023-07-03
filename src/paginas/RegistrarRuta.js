import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registrarRuta } from "../actions/rutaActions";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";
import { RESET_RUTA_REGISTRAR } from "../constantes/rutaConstantes";

const RegistrarRuta = () => {
  // Funcion para disparar acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener el estado desde el Redux store
  const rutaRegistrar = useSelector((state) => state.rutaRegistrar);
  const {
    loading: loadingRegistrar,
    success: succcessRegistrar,
    error: errorRegistrar,
  } = rutaRegistrar;

  const [nombre, setNombre] = useState("");
  const [dia, setDia] = useState("LUNES");
  const [repartidor, setRepartidor] = useState("");

  useEffect(() => {
    // Si el registro fue correcto, reset rutaRegistrar y redireccionar a la pagina de rutas
    if (succcessRegistrar) {
      dispatch({ type: RESET_RUTA_REGISTRAR });
      alert("El registro fue exitoso");
      navigate("/rutas");
    }
  }, [navigate, succcessRegistrar, dispatch]);

  const manejarRegistrarRuta = (e) => {
    e.preventDefault();

    // Disparar la accion de registrar
    dispatch(
      registrarRuta({
        NOMBRE: nombre,
        DIA: dia,
        REPARTIDOR: repartidor,
      })
    );
  };

  // Aqui no es necesario empezar con loading porque no hay un estado necesario al cargar el componente.
  return (
    <div style={{ padding: "25px", width: "50%" }}>
      {loadingRegistrar && <Loader />}
      {errorRegistrar && <Mensaje variant="danger">{errorRegistrar}</Mensaje>}
      {/* Esta es la parte que cambia en las paginas */}
      <h1>Registrar ruta</h1>
      <Form onSubmit={manejarRegistrarRuta}>
        <Form.Group controlId="dia">
          <Form.Label>NOMBRE</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="nombre">
          <Form.Label>DIA</Form.Label>
          <Form.Control
            as="select"
            value={dia}
            onChange={(e) => setDia(e.target.value)}
          >
            <option value="LUNES">LUNES</option>
            <option value="MARTES">MARTES</option>
            <option value="MIERCOLES">MIERCOLES</option>
            <option value="JUEVES">JUEVES</option>
            <option value="VIERNES">VIERNES</option>
            <option value="SABADO">SABADO</option>
            <option value="DOMINGO">DOMINGO</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="repartidor">
          <Form.Label>Repartidor</Form.Label>
          <Form.Control
            type="text"
            value={repartidor}
            onChange={(e) => setRepartidor(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit">Registrar ruta</Button>
      </Form>
    </div>
  );
};

export default RegistrarRuta;
