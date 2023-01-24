import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useState } from "react";

function App() {
  const [table, setTable] = useState(<></>);
  //TODO: change state hooks to match the elastic search topic.
  const [query, setQuery] = useState("");
  //const [results, setResults] = useState([]);

  //TODO: change submit handler to parse the elastic search query.
  const handleSubmit = (e) => {
      e.preventDefault(); //don't refresh page when submitted
      setTable(
          <Table striped bordered hover variant="dark">
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Release Year</th>
                      <th>Rating</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>1</td>
                      <td>Minions</td>
                      <td>2015</td>
                      <td>10.0</td>
                  </tr>
                  <tr>
                      <td>2</td>
                      <td>Minions: The Rise of Gru</td>
                      <td>2022</td>
                      <td>9.9</td>
                  </tr>
              </tbody>
          </Table>
      );
    };


  return (
    <>
      <div className="App">
        <div className="Wrapper">
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
