import React from "react";

import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useLocalStorage } from "../hooks/useLocalStorage";

const { IS_PROD } = process.env;

export const NavBar = () => {
  const { clear } = useLocalStorage();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Trello Clone</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">
              {!IS_PROD && (
                <Button
                  variant="danger"
                  onClick={() => {
                    clear();
                    window.location.reload();
                  }}
                >
                  Borrar todo
                </Button>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
