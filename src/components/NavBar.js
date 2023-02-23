import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink, useHistory } from "react-router-dom";
// import { UserStoreContext } from "../context/UserContext";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/actions/authAction";

const NavBar = () => {
  const history = useHistory();
  //context
  // const userStore = React.useContext(UserStoreContext);
  // const getProfile = () => {
  //   const profileValue = JSON.parse(localStorage.getItem("profile"));
  //   if (profileValue) {
  //     userStore.updateProfile(profileValue);
  //   }
  // };
  // const logout = () => {
  //   localStorage.removeItem("profile");
  //   localStorage.removeItem("token");
  //   userStore.updateProfile(null);
  //   history.replace("/");
  //   // history.go(0);
  // };
  // useEffect(() => {
  //   // console.log("use effect navbar");
  //   getProfile();
  // }, []);
  // redux
  const profileRedux = useSelector((state) => state.authReducer.profile);
  const total = useSelector((state) => state.cartReducer.total);
  const dispatch = useDispatch();
  const getProfile = () => {
    const profileValue = JSON.parse(localStorage.getItem("profile"));
    if (profileValue) {
      dispatch(updateProfile(profileValue));
    }
  };
  useEffect(() => {
    // console.log("use effect navbar");
    getProfile();
  }, []);
  const logout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
    dispatch(updateProfile(null));
    history.replace("/");
    // history.go(0);
  };

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
                <NavLink
                  className="nav-link"
                  to="/cart"
                  exact
                  activeClassName="active"
                >
                  ตะกร้าสินค้า {total} ชิ้น
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
                <NavLink
                  className="nav-link"
                  to="/chart"
                  exact
                  activeClassName="active"
                >
                  Report Chart
                </NavLink>
              </Nav>

              {/* {userStore.profile ? (
                <span className="navber-text">
                  {" "}
                  welcome : {userStore.profile.name} role :{" "}
                  {userStore.profile.role}
                  <button className="btn btn-danger ml-4" onClick={logout}>
                    {" "}
                    Logout{" "}
                  </button>
                </span>
              ) : (
                <>
                  <Nav className="mr-auto">
         
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
              )} */}
              {profileRedux ? (
                <span className="navber-text">
                  {" "}
                  welcome : {profileRedux.name} role : {profileRedux.role}
                  <button className="btn btn-danger ml-4" onClick={logout}>
                    {" "}
                    Logout{" "}
                  </button>
                </span>
              ) : (
                <>
                  <Nav className="mr-auto">
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
