import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useEffect, useState } from "react";

import testData from "./testdata.json";

function App() {
  const [table, setTable] = useState(<></>);
  //TODO: change state hooks to match the elastic search topic.
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  //TODO: change submit handler to parse the elastic search query.
  const handleSubmit = (e) => {
    e.preventDefault(); //don't refresh page when submitted
    handleResults();
  };

  useEffect(() => {
    if (results.length !== 0) {
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
            {results.map((film) => {
              return (
                <tr>
                  <td>{film.id}</td>
                  <td>{film.title}</td>
                  <td>{film.year}</td>
                  <td>{film.rating}</td>
                  <td
                    className="d-grid gap-2"
                    style={{ "text-align": "center" }}
                  >
                    <Button variant="secondary" id="button-addon2" size="sm">
                      Click to save!
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    }
  }, [results]);

  const handleResults = () => {
    let data = [];

    testData.forEach((film) => {
      let cur = [];

      cur.id = film.imdbID;
      cur.title = film.Title;
      cur.year = film.Year;
      cur.rating = film.imdbRating;

      data.push(cur);
    });

    setResults(data);
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
