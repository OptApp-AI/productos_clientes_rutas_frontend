import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

const Encabezado = () => {
  const usuarioInfo = useSelector((state) => state.usuarioInfo);
  const { tokens } = usuarioInfo;

  return (
    <Navbar bg="light" expand="lg">
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
    </Navbar>
  );
};

export default Encabezado;
