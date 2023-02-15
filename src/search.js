import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useState } from "react";
import axios from "axios";

function Search(props) {
  //const { results, setResults } = props;
  const [table, setTable] = useState(<></>);
  const savedTable = [];
  //TODO: change state hooks to match the elastic search topic.
  const [query, setQuery] = useState("");

  const [savedValues, setSavedResults] = useState(new Map());
  //const [testData, setTestData] = useState([]);

  const client = axios.create({
    withCredentials: true,
    baseURL: "https://osu-cse-search-4067143756.us-east-1.bonsaisearch.net",
  });

  //TODO: change submit handler to parse the elastic search query.
  const handleSubmit = async (e) => {
    e.preventDefault(); //don't refresh page when submitted
    //TODO: customize queries.
    if (query !== "") {
      const res = await client.get(
        "/imdb/_search?pretty&q=primaryTitle=" + query
      );
      console.log("Res:", res?.data?.hits?.hits);
      let data = [];
      res?.data?.hits?.hits.forEach((film) => {
        let cur = [];
        cur.id = film._id;
        cur.title = film._source.primaryTitle;
        cur.year = film._source.startYear;
        cur.rating = film._source.averageRating;
        data.push(cur);
      });
      //setResults(data);
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
            {data.map((film) => {
              return (
                <tr>
                  <td>{film.id}</td>
                  <td>{film.title}</td>
                  <td>{film.year}</td>
                  <td>{film.rating}</td>
                  <td className="d-grid gap-2" style={{ textAlign: "center" }}>
                    <Button
                      variant="secondary"
                      id="button-addon2"
                      size="sm"
                      onClick={() =>
                        testFunction(
                          film.title,
                          film.year,
                          film.rating,
                          film.id
                        )
                      }
                    >
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
  };
  const testFunction = (filmTitle, filmYear, filmRating, filmID) => {
    var filmInfo = [filmTitle, filmYear, filmRating];
    if (!savedValues.has(filmID)) {
      const updateMap = (key, value) => {
        setSavedResults((map) => new Map(map.set(key, value)));
      };
      updateMap(filmID, filmInfo);
    }
  };

  return (
    <>
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
            {savedValues.forEach((value) => {
              savedTable.push(
                <tr>
                  <td>{value[0]}</td>
                  <td>{value[1]}</td>
                  <td>{value[2]}</td>
                </tr>
              );
            })}
            {savedTable}
          </tbody>
        </Table>
      )}

      <h3 className="SearchBarTitle">ElasticMedia</h3>
      <Form onSubmit={handleSubmit} className="search-bar">
        <InputGroup className="mb-3" size="lg">
          <Form.Control
            placeholder="Search your media"
            aria-label=""
            aria-describedby="basic-addon2"
            onChange={(e) => {
              if (e.target.value.match(/^[A-Z 'a-z0-9]*$/)) {
                setQuery(e.target.value);
              }
            }}
            value={query}
          />
          <Button variant="outline-success" type="submit" id="button-addon2">
            Search
          </Button>
        </InputGroup>
      </Form>
      {table}
    </>
  );
}

export default Search;
