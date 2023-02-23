import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink, useHistory } from "react-router-dom";
const NavBar = () => {
  const history = useHistory();
  const [profile, setProfile] = useState(null);
  const getProfile = () => {
    const profileValue = JSON.parse(localStorage.getItem("profile"));
    if (profileValue) {
      setProfile(profileValue);
    }
  };
  const logout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
    history.replace("/");
    history.go(0);
  };
  useEffect(() => {
    console.log("use effect navbar");
    getProfile();
  }, []);

  return (
    <>
      <header>
        <Navbar bg="light" expand="lg">
          <Container>
            <NavLink className="navbar-brand" to="/" exact>
              <img
                src="./logo192.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />{" "}
              Simple React App
            </NavLink>
            {/* <Navbar.Brand href="#home">
              <img
                src="./logo192.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand> */}
            {/* <Navbar.Brand href="#home">Board Game World</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/* <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">About</Nav.Link> */}
                <NavLink
                  className="nav-link"
                  to="/"
                  exact
                  activeClassName="active"
                >
                  Home
                </NavLink>
                <NavLink
                  className="nav-link"
                  to="/product"
                  exact
                  activeClassName="active"
                >
                  Product
                </NavLink>
                <NavLink
                  className="nav-link"
                  to="/about"
                  exact
                  activeClassName="active"
                >
                  About
                </NavLink>

                <NavDropdown
                  title="Workshop (Pagination + CRUD)"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item
                    onClick={() => {
                      history.replace("/hospital");
                    }}
                  >
                    Hospital Detail (Pagination)
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => {
                      history.replace("/category");
                    }}
                  >
                    หมวดหมู่ข่าว (CRUD)
                  </NavDropdown.Item>
                </NavDropdown>
                <NavLink
                  className="nav-link"
                  to="/upload"
                  exact
                  activeClassName="active"
                >
                  Upload
                </NavLink>
                <NavLink
                  className="nav-link"
                  to="/member"
                  exact
                  activeClassName="active"
                >
                  Member
                </NavLink>
              </Nav>

              {profile ? (
                <span className="navber-text">
                  {" "}
                  welcome : {profile.name} role : {profile.role}
                  <button className="btn btn-danger ml-4" onClick={logout}>
                    {" "}
                    Logout{" "}
                  </button>
                </span>
              ) : (
                <>
                  <Nav className="mr-auto">
                    {/* <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">About</Nav.Link> */}
                    <NavLink
                      className="nav-link"
                      to="/register"
                      exact
                      activeClassName="active"
                    >
                      Register
                    </NavLink>
                    <NavLink
                      className="nav-link"
                      to="/login"
                      exact
                      activeClassName="active"
                    >
                      Login
                    </NavLink>
                  </Nav>
                </>
              )}

              {/* <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form> */}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default NavBar;
