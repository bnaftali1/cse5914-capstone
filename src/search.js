import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useState } from "react";
import axios from "axios";
import Carousel from "react-grid-carousel";

var Buffer = require("buffer/").Buffer;

function Search(props) {
  const [results, setResults] = useState([]); //return of axios call
  const [query, setQuery] = useState(""); //what the user types into search bar
  const [savedMovies, setSavedMovies] = useState([]); //list of movies saved by user

  const token = `${process.env.REACT_APP_BONSAI_UNAME}:${process.env.REACT_APP_BONSAI_PSWRD}`;
  const encodedToken = Buffer.from(token).toString("base64");

  const client = axios.create({
    withCredentials: true,
    baseURL: "https://osu-cse-search-4067143756.us-east-1.bonsaisearch.net",
    headers: { Authorization: "Basic " + encodedToken },
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
      let queryReturn = [];
      res?.data?.hits?.hits.forEach((film) => {
        let cur = {};
        cur.id = film._id;
        cur.title = film._source.primaryTitle;
        cur.year = film._source.startYear;
        cur.rating = film._source.averageRating;
        cur.imageUrl = film._source.imageUrl;
        queryReturn.push(cur);
      });
      setResults(queryReturn);
    }
  };

  const deleteMovie = (deleteFilm) => {
    setSavedMovies((savedMovies) =>
      savedMovies.filter((film) => film.id !== deleteFilm.id)
    );
  };

  const saveMovie = (film) => {
    if (!savedMovies.includes(film)) {
      setSavedMovies((savedMovies) => [...savedMovies, film]);
    }
  };
  const sortTitle = (target) => {
    const sortedTitles = [...target].sort((a, b) => {
      const nameA = a.title.toUpperCase();
      const nameB = b.title.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setSavedMovies(sortedTitles);
    console.log(savedMovies);
  };
  return (
    <>
      {savedMovies.length > 0 && (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>
                Title{" "}
                <Button
                  className="sort-button"
                  onClick={() => sortTitle(savedMovies)}
                >
                  ↓
                </Button>
                <Button className="sort-button">↑</Button>
              </th>
              <th>
                Release Year<Button className="sort-button">↓</Button>
                <Button className="sort-button">↑</Button>
              </th>
              <th>
                Rating<Button className="sort-button">↓</Button>
                <Button className="sort-button">↑</Button>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {savedMovies.map((film) => {
              return (
                <tr>
                  <td>{film.title}</td>
                  <td>{film.year}</td>
                  <td>{film.rating}</td>
                  <td>
                    <Button
                      variant="danger"
                      id="button-addon2"
                      size="sm"
                      onClick={() => deleteMovie(film)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      <h3 className="SearchBarTitle">FlickMe</h3>
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

      {results.length > 0 && (
        <div>
          <Carousel cols={5} rows={1} gap={10} loop>
            {results.map((film) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={film.imageUrl}
                    alt="First slide"
                    style={{ cursor: "pointer" }}
                    onClick={() => saveMovie(film)}
                  />
                </Carousel.Item>
              );
              {
                /* {savedMovies.includes(film) ? (
                    <Button
                      variant="danger"
                      id="button-addon2"
                      size="sm"
                      onClick={() => deleteMovie(film)}
                    >
                      Remove Saved
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      id="button-addon2"
                      size="sm"
                      onClick={() => saveMovie(film)}
                    >
                      Click to Save!
                    </Button>
                  )} */
              }
            })}
          </Carousel>
        </div>
      )}
    </>
  );
}

export default Search;
