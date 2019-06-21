import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../styles/topMenu.css";

const TopMenu = () => {
  return (
    <Navbar fixed="top" bg="light" expand="lg" className="top-menu">
      <Navbar.Brand href="#home">Notit</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="top-menu-nav-link" href="#home">
            Note your day
          </Nav.Link>
          <Nav.Link className="top-menu-nav-link" href="#link">
            Your statistics
          </Nav.Link>
          <Nav.Link className="top-menu-nav-link" href="#link">
            Login
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopMenu;
