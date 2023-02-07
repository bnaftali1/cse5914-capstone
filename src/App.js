import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useEffect, useState } from "react";

import testData from './testdata.json';

function App() {
    const [table, setTable] = useState(<></>);
    const savedTable = [];
  //TODO: change state hooks to match the elastic search topic.
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [savedValues, setSavedResults] = useState(new Map());
  //TODO: change submit handler to parse the elastic search query.
  const handleSubmit = (e) => {
      e.preventDefault(); //don't refresh page when submitted
      handleResults()
    };
    const testFunction = (filmTitle, filmYear, filmRating,filmID) => {
        var filmInfo = [filmTitle, filmYear, filmRating ]
        if ( !savedValues.has(filmID)) {
            const updateMap = (key, value) => {
               setSavedResults(map => new Map(map.set(key, value)));
               
            }
            updateMap(filmID, filmInfo);
        }
       
        
        
    }
  useEffect(()=>{
    if (results.length !== 0){
    setTable(
      <Table striped bordered hover variant="dark">
          <thead>
              <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Release Year</th>
                  <th>Rating</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
          {results.map((film)=>{
              return(
              <tr>
                <td>{film.id}</td>
                <td>{film.title}</td>
                <td>{film.year}</td>
                <td>{film.rating}</td>
                <td className="d-grid gap-2" style={{"text-align":"center"}}>
                  <Button 
                              variant="secondary"
                              id="button-addon2"
                              size="sm"
                              onClick={() =>testFunction(film.title, film.year,film.rating, film.id)}>
                  Click to save!
                  </Button>
                </td>
              </tr>
              )
          })
          }
          </tbody>
      </Table>
  );}
  }, [results])

  const handleResults = () =>{
    let data = [];
    
    testData.forEach((film)=>{
        let cur = [];

        cur.id = film.imdbID;
        cur.title = film.Title;
        cur.year = film.Year;
        cur.rating = film.imdbRating;

        
        data.push(cur);
    });

    setResults(data);

  }


  return (
      <>
      <div className="App">
              <div className="Wrapper">
                  {savedValues.size > 0 && (
                      <Table striped bordered hover variant="dark">
                          <thead>
                              <tr>
                                  <th>Title</th>
                                  <th>Release Year</th>
                                  <th>Rating</th>
                              </tr>
                          </thead>
                          <tbody>
                              {
                                  savedValues.forEach((value) => {
                                      savedTable.push(<tr><td>{value[0]}</td><td>{value[1]}</td><td>{value[2]}</td></tr>)
                                  })
                                  
                                  
                              }
                              {savedTable}
                          </tbody>
                      </Table>)}

          <h3 className="SearchBarTitle">ElasticMedia</h3>
          <Form onSubmit={handleSubmit} className="search-bar">
            <InputGroup className="mb-3" size="lg">
              <Form.Control
                placeholder="Search your media"
                aria-label=""
                aria-describedby="basic-addon2"
                onChange={(e) => {
                  if (e.target.value.match(/^[A-Za-z0-9]*$/)) {
                    setQuery(e.target.value);
                  }
                }}
                value={query}
              />
              <Button
                variant="outline-success"
                type="submit"
                id="button-addon2"
              >
                Search
                </Button>
                         
            </InputGroup>
                  </Form>
                  {table}
                  
                  
        </div>
      </div>
    </>
  );
}

export default App;
