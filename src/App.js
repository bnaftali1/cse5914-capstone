import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter as Router, Routes, Route, Link }
    from 'react-router-dom';
import React, { useState } from "react";

import Search from "./search";
import SavedMoviesPage from "./SavedMoviePage"
import Test from "./TestPage"
function App() {
    const [results, setResults] = useState([]);
   
    const [savedMovies, setSavedMovies] = useState([]); //list of movies saved by user

  return (
      <>
          <Router>
          <Navbar variant="dark" bg="dark" expand="lg">
              <Container fluid>
                      <Navbar.Brand as={Link} to="/" >FlickMe!</Navbar.Brand>
                  <Navbar.Toggle aria-controls="navbar-dark-example" />
                  <Navbar.Collapse id="navbar-dark-example">
                      <Nav>
                          <NavDropdown
                              id="nav-dropdown-dark-example"
                              title="Options"
                              menuVariant="dark"
                          >
                              <NavDropdown.Item as={Link} to="/savedMovies">My Saved Movies</NavDropdown.Item>
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
              
              <Routes>
                  <Route path='/savedMovies' element={<div className="App"><div className="Wrapper"><SavedMoviesPage savedMovies={savedMovies} setSavedMovies={setSavedMovies} /></div></div>} />
                  <Route path='/' element={<div className="App"><div className="Wrapper"><Search results={results} setResults={setResults} setSavedMovies={setSavedMovies} savedMovies={savedMovies}/></div></div>}/>
              </Routes>
         </Router>
    
          
    </>
  );
}

export default App;
