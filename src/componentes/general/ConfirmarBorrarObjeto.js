import { Container, Row } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { borrarProducto } from "../../actions/productoActions";
import { useDispatch } from "react-redux";
import { borrarCliente } from "../../actions/clienteActions";
import { borrarUsuario } from "../../actions/usuarioActions";
import { StyledCol, StyledIcono } from "./styles/ConfirmarBorrarObjeto.styles";
import { borrarRuta } from "../../actions/rutaActions";

const ConfirmarBorrarObjeto = ({ id, t, objeto }) => {
  const dispatch = useDispatch();

  const manejarBorrarObjeto = () => {
    if (objeto === "ruta") {
      dispatch(borrarRuta(id));
    } else if (objeto === "cliente") {
      alert("cliente");
    } else if (objeto === "usuario") {
      alert("usuario");
    }
  };

  return (
    <Container>
      <Row>Estás seguro de eliminar el {objeto}?</Row>
      <Row>
        <StyledCol>
          <StyledIcono onClick={manejarBorrarObjeto}>
            <i className="fa-solid fa-circle-check fa-2xl green"></i>
          </StyledIcono>
        </StyledCol>
        <StyledCol>
          <StyledIcono
            onClick={() => {
              toast.dismiss(t.id);
              toast.error("Operacion cancelada", { duration: 2000 });
            }}
          >
            <i className="fa-sharp fa-solid fa-circle-xmark fa-2xl red"></i>
          </StyledIcono>
        </StyledCol>
      </Row>
    </Container>
  );
};

export default ConfirmarBorrarObjeto;
