import React, { useEffect } from "react";
import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  StyledImageContainer,
  StyledLinkContainerEmpresa,
  StyledNavbar,
  StyledNavDropdown,
  StyledNavWrapper,
  StyledText,
} from "./styles/Encabezado.styles";
import { BASE_URL } from "../../constantes/constantes";

const Encabezado = () => {
  // Funcion para obtener pathname
  const location = useLocation();

  // Funcion para obtener informacion del
  const usuarioInfo = useSelector((state) => state.usuarioInfo);
  const { token } = usuarioInfo;

  const [username, setUsername] = useState("");
  const [imagen, setImagen] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      setUsername(JSON.parse(localStorage.getItem("username")));
      setImagen(JSON.parse(localStorage.getItem("imagen")));
      setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
      setIsAuthenticated(true);
    }
  }, [token]);

  return (
    <StyledNavbar expand="lg" bg="light" variant="light">
      <Container className="d-flex">
        {/* Imagen de la cuenta */}
        {isAuthenticated && (
          <LinkContainer to="/cuenta">
            <StyledNavWrapper className="text-center">
              <StyledImageContainer>
                <Image
                  src={`${BASE_URL}${imagen}`}
                  alt="imagen de usuario"
                  width="50px"
                  height="100%"
                  style={{
                    marginRight: "20px",
                    paddi: "20px",
                    borderRadius: "50%",
                  }}
                />
              </StyledImageContainer>
              <StyledText>{username}</StyledText>
            </StyledNavWrapper>
          </LinkContainer>
        )}

        {/* Logo de la empresa */}
        <StyledLinkContainerEmpresa to="/">
          <Nav.Link className="text-center">
            <Image
              src={`${BASE_URL}media/imagenes/general/logo.png`}
              alt="imagen de usuario"
              width="100px"
              style={{ marginRight: "20px" }}
            />
            <StyledText>Hielo Gran Pacífico</StyledText>
          </Nav.Link>
        </StyledLinkContainerEmpresa>

        {/* Menu de navegacion */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end"
          style={{ flexGrow: 0 }}
        >
          <Nav>
            {!isAuthenticated ? (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            ) : (
              <>
                <StyledNavDropdown
                  bgcolor={
                    location.pathname === "/rutas" ||
                    location.pathname === "/registrar-ruta"
                      ? "#1E90FF"
                      : "black"
                  }
                  title={<StyledText>Rutas</StyledText>}
                  id="basic-nav-dropdown"
                >
                  <LinkContainer to="/rutas">
                    <NavDropdown.Item>Lista de Rutas</NavDropdown.Item>
                  </LinkContainer>
                  {isAdmin && (
                    <LinkContainer to="/registrar-ruta">
                      <NavDropdown.Item>Registrar Ruta</NavDropdown.Item>
                    </LinkContainer>
                  )}
                </StyledNavDropdown>

                <StyledNavDropdown
                  bgcolor={
                    location.pathname === "/salida-rutas" ||
                    location.pathname === "/realizar-salida-ruta"
                      ? "#1E90FF"
                      : "black"
                  }
                  title={<StyledText>Salidas a Ruta</StyledText>}
                  id="basic-nav-dropdown"
                >
                  <LinkContainer to="/salida-rutas">
                    <NavDropdown.Item>Lista de Salidas a Ruta</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/realizar-salida-ruta">
                    <NavDropdown.Item>Realizar Salida a Ruta</NavDropdown.Item>
                  </LinkContainer>
                </StyledNavDropdown>

                {isAdmin && (
                  <StyledNavDropdown
                    bgcolor={
                      location.pathname === "/usuarios" ||
                      location.pathname === "/registrar-usuario"
                        ? "#1E90FF"
                        : "black"
                    }
                    title={<StyledText>Usuarios</StyledText>}
                    id="basic-nav-dropdown"
                    style={{ paddingBottom: "10px" }}
                  >
                    <LinkContainer to="/usuarios">
                      <NavDropdown.Item>Lista de Usuarios</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/registrar-usuario">
                      <NavDropdown.Item>Registrar Usuario</NavDropdown.Item>
                    </LinkContainer>
                  </StyledNavDropdown>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default Encabezado;

/* <Navbar bg="light" expand="lg">
<Container>
  <LinkContainer to="/">
    <Navbar.Brand>OptAppAI</Navbar.Brand>
  </LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
      {!tokens ? (
        <LinkContainer to="/login">
          <Nav.Link>Login</Nav.Link>
        </LinkContainer>
      ) : (
        <>
          <NavDropdown title="Rutas" id="basic-nav-dropdown">
            <LinkContainer to="/rutas">
              <NavDropdown.Item>Lista de Rutas</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/registrar-ruta">
              <NavDropdown.Item>Registrar Ruta</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>

          <NavDropdown title="Salidas a ruta" id="basic-nav-dropdown">
            <LinkContainer to="/salida-rutas">
              <NavDropdown.Item>Lista de Salidas a ruta</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/realizar-salida-ruta/clientes">
              <NavDropdown.Item>Realizar Salida a Ruta</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>

          <LinkContainer to="/devoluciones">
            <Nav.Link>Lista de Devoluciones</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/a">
            <Nav.Link>Venta</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/b">
            <Nav.Link>Aviso de Visita</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/c">
            <Nav.Link>Productos Cargados</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/d">
            <Nav.Link>Clientes Cargados</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/resumen">
            <Nav.Link>Resumen/Corte</Nav.Link>
          </LinkContainer>
        </>
      )}
    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar> */
