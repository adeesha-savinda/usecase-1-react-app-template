// import logo from './logo.svg';
import React, { useEffect } from 'react';
import './App.css';
import './App.scss';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Catalog from './components/Catalog/Catalog.js';
import MyCart from './components/MyCart/Cart.js';
import Admin from './components/Admin/Admin.js';

import { AuthProvider } from "@asgardeo/auth-react";
import { useAuthContext } from "@asgardeo/auth-react";

import { default as authConfig } from "./authConfig.json";

// Component to render the login/signup/logout menu
const RightLoginSignupMenu = () => {
  let { state, signIn, signOut, getAccessToken, getIDToken } = useAuthContext();

  // Based on Asgardeo SDK, set a variable like below to check and conditionally render the menu
  let isLoggedIn = state.isAuthenticated;

  // Host the menu content and return it at the end of the function
  let menu;


  useEffect(() => {

    if (!state?.isAuthenticated) {
      return;
    }

    (async () => {
      const accessToken = await getAccessToken();
      const idToken = await getIDToken();
      console.log(`Access Token: ${accessToken}`);
      console.log(`Id Token: ${idToken}`);

      const response = await fetch("https://938b79aa-9e72-4948-90f5-9a88e9cdfaf0-dev.e1-us-east-azure.choreoapis.dev/iwfo/myfirstapi/1.0.0/items", {
        headers: {
          Accept: "text/plain",
          "Authorization": `Bearer ${accessToken}`,
        }
      });

      console.log(response);
    })();



  }, [state.isAuthenticated, getAccessToken, getIDToken]);

  // Conditionally render the following two links based on whether the user is logged in or not
  if (isLoggedIn) {
    menu = <>
      <Nav>
        <Nav.Link href="#deets" onClick={() => signOut()}>Logout</Nav.Link>
        <Nav.Link href="#deets"><FontAwesomeIcon icon={faUser} /></Nav.Link></Nav>
    </>
  } else {
    menu = <>
      <Nav>
        <Nav.Link href="#deets" onClick={() => signIn()}>Login</Nav.Link>
        <Nav.Link href="#deets">Sign Up</Nav.Link></Nav>
    </>
  }
  return menu;
}

// Component to render the navigation bar
const PetStoreNav = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">PetStore</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="nav-link">Catalog</Link>
              <Link to="/mycart" className="nav-link">My Cart</Link>
              <Link to="/admin" className="nav-link">Admin</Link>
            </Nav>
          </Navbar.Collapse>
          <RightLoginSignupMenu />
        </Container>
      </Navbar>
    </>
  );
};

// Main app component
const App = () => {

  useEffect(() => {
    document.title = 'PetStore';
  }, []);
  return (
    <>
      <AuthProvider config={authConfig}>
        <BrowserRouter>
          <PetStoreNav />
          <Switch>
            <Route exact path="/">
              <Catalog />
            </Route>
            <Route path="/mycart">
              <MyCart />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
