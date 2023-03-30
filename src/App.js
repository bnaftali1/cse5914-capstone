import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import React, { useState } from "react";

import Search from "./search";
function App() {
    const [results, setResults] = useState([]);
    const [navbarOptions, SetNavbarOptions] = useState(null);
    const GenerateNavOpitons = () => {
        
        if (navbarOptions == null) {
            
            SetNavbarOptions( 
              );
            
        }
        else {
            SetNavbarOptions(null);
        }
    };
  return (
      <>
          <Navbar variant="dark" bg="dark" expand="lg">
              <Container fluid>
                  <Navbar.Brand href="#home">FlickMe!</Navbar.Brand>
                  <Navbar.Toggle aria-controls="navbar-dark-example" />
                  <Navbar.Collapse id="navbar-dark-example">
                      <Nav>
                          <NavDropdown
                              id="nav-dropdown-dark-example"
                              title="Options"
                              menuVariant="dark"
                          >
                              <NavDropdown.Item href="#">My Saved Movies</NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.2">
                                  Recommendations
                              </NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.3">Movie Search</NavDropdown.Item>
                              <NavDropdown.Divider />
                              <NavDropdown.Item href="#action/3.4">
                                  Separated link
                              </NavDropdown.Item>
                          </NavDropdown>
                      </Nav>
                  </Navbar.Collapse>
              </Container>
          </Navbar>
         
      <div className="App">
        <div className="Wrapper">
          <Search results={results} setResults={setResults} />
        </div>
      </div>
    </>
  );
}

export default App;
