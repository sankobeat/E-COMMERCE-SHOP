import React from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  LinkContainers,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link stlye={{ display: "flex", justifyContent: "center" }}>
                <Link to="/cart" style={{ color: "white" }}>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Link>
              </Nav.Link>
              {userInfo ? (
                <Nav.Link>
                  <NavDropdown title={userInfo.name} id="username">
                    <NavDropdown.Item>
                      <Link to="/profile">Profile</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav.Link>
              ) : (
                <Nav.Link>
                  <Link to="/login" style={{ color: "white" }}>
                    <i className="fas fa-user"></i> Sign In
                  </Link>
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="admin features" id="admin">
                  <NavDropdown.Item>
                    <Link to="/admin/userlist">Users</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/admin/productlist">Products</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/admin/orders">Orders</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
