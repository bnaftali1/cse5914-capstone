import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import React, { useState } from "react";
import axios from "axios";
import Carousel from "react-grid-carousel";
import Card from "react-bootstrap/Card";

var Buffer = require("buffer/").Buffer;

function Search({ setSavedMovies, savedMovies }) {
  const [value, setValue] = useState("");
  const handleSelect = (e) => {
    console.log(e);
    setValue(e);
  };
  const [results, setResults] = useState([]); //return of axios call

  const [input, setInput] = useState(""); //what the user types into search bar
  const [querySize, setQuerySize] = useState(10);
  const [queryParam, setQueryParam] = useState();

  const [selectedCheckbox, setSelectedCheckbox] = useState("title");

  const handleCheckboxChange = (event) => {
    setSelectedCheckbox(event.target.value.toLowerCase());
    console.log(event.target.value.toLowerCase());
  };

  const token = `${process.env.REACT_APP_BONSAI_UNAME}:${process.env.REACT_APP_BONSAI_PSWRD}`;

  const encodedToken = Buffer.from(token).toString("base64");

  const client = axios.create({
    withCredentials: true,
    baseURL: "https://osu-cse-search-4067143756.us-east-1.bonsaisearch.net",
    headers: { Authorization: "Basic " + encodedToken },
  });

  const loadMore = async (e) => {
    let esQuery = queryParam; // add query size
    esQuery.size = esQuery.size + 10;
    setQueryParam(esQuery);
    client
      .post("/imdb/_search", esQuery)
      .then((response) => {
        console.log(response.data.hits.hits);
        let queryReturn = [];
        response?.data?.hits?.hits.forEach((film) => {
          let cur = {};
          cur.id = film._id;
          cur.title = film._source.primaryTitle;
          cur.year = film._source.startYear;
          cur.rating = film._source.averageRating;
          cur.imageUrl = film._source.imageUrl;
          queryReturn.push(cur);
        });
        setResults(queryReturn);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSubmit = async (e) => {
    setQuerySize(10);
    e.preventDefault(); //don't refresh page when submitted
    var esQuery = null;
    if (input !== "") {
      if (selectedCheckbox === "title") {
        esQuery = {
          query: {
            match: {
              primaryTitle: input,
            },
          },
        };
      } else if (selectedCheckbox === "genre") {
        esQuery = {
          query: {
            match: {
              genres: input,
            },
          },
        };
      } else if (selectedCheckbox === "year") {
        esQuery = {
          query: {
            match: {
              startYear: input,
            },
          },
        };
      } else if (selectedCheckbox === "actor") {
        esQuery = {
          query: {
            match: {
              actor: input,
            },
          },
        };
      } else if (selectedCheckbox === "actress") {
        esQuery = {
          query: {
            match: {
              actress: input,
            },
          },
        };
      } else if (selectedCheckbox === "writer") {
        esQuery = {
          query: {
            match: {
              writer: input,
            },
          },
        };
      } else if (selectedCheckbox === "director") {
        esQuery = {
          query: {
            match: {
              director: input,
            },
          },
        };
      } else if (selectedCheckbox === "producer") {
        esQuery = {
          query: {
            match: {
              producer: input,
            },
          },
        };
      } else {
        esQuery = {
          query: {
            match: {
              primaryTitle: input,
            },
          },
        };
      }
      esQuery = {
        ...esQuery,
        size: 10,
      }; // add query size
      setQueryParam(esQuery);
      client
        .post("/imdb/_search", esQuery)
        .then((response) => {
          console.log(response.data.hits.hits);
          let queryReturn = [];
          response?.data?.hits?.hits.forEach((film) => {
            let cur = {};
            cur.id = film._id;
            cur.title = film._source.primaryTitle;
            cur.year = film._source.startYear;
            cur.rating = film._source.averageRating;
            cur.imageUrl = film._source.imageUrl;
            queryReturn.push(cur);
          });
          setResults(queryReturn);
        })
        .catch((error) => {
          console.error(error);
        });
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

  return (
    <>
      <h3 className="SearchBarTitle">FlickMe</h3>

      <Form onSubmit={handleSubmit} className="search-bar">
        <InputGroup className="mb-3" size="lg">
          <DropdownButton
            variant="outline-light"
            title={value || "Movies"}
            onSelect={handleSelect}
          >
            {["Movies", "Songs", "TV Shows"].map((option) => (
              <Dropdown.Item eventKey={option}>{option}</Dropdown.Item>
            ))}
          </DropdownButton>
          <Form.Control
            placeholder={
              !value
                ? "Search your movies"
                : "Search your " + value.toLowerCase()
            }
            aria-label=""
            aria-describedby="basic-addon2"
            onChange={(e) => {
              if (e.target.value.match(/^[A-Z 'a-z0-9 -:]*$/)) {
                setInput(e.target.value);
              }
            }}
            value={input}
          />
          <Button variant="outline-success" type="submit" id="button-addon2">
            Search
          </Button>
        </InputGroup>
        {value.toLowerCase() === "movies" && (
          <div>
            {[
              "Movie Title",
              "Genre",
              "Year",
              "Actor",
              "Actress",
              "Writer",
              "Director",
            ].map((value) => (
              <Form.Check
                key={value}
                inline
                type={"checkbox"}
                id={`check-api-checkbox`}
                value={value}
              >
                <Form.Check.Input
                  type="checkbox"
                  value={value}
                  isValid
                  onChange={handleCheckboxChange}
                />
                <Form.Check.Label>{`${value}`}</Form.Check.Label>
              </Form.Check>
            ))}
          </div>
        )}
      </Form>

      {results.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Carousel cols={5} rows={querySize / 10} gap={10} loop>
            {results.map((film) => {
              return (
                <Carousel.Item
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {savedMovies.includes(film) ? (
                    <>
                      <div classNam="card-wrapper">
                        <Card
                          border="success"
                          style={{
                            backgroundColor: "transparent",
                            height: "430px",
                          }}
                        >
                          <Card.Img
                            className="d-block w-100"
                            variant="top"
                            src={film.imageUrl}
                            alt={film.title}
                            style={{
                              cursor: "pointer",
                              height: "auto",
                              maxHeight: "320px",
                              padding: "22px",
                              filter: "grayscale(1)",
                            }}
                            onClick={() => deleteMovie(film)}
                          />
                          <Card.Header
                            style={{
                              color: "rgb(206, 206, 206)",

                              paddingBottom: "0",
                            }}
                          >
                            {film.title}
                          </Card.Header>
                          <Card.Body>
                            <Card.Text
                              style={{
                                color: "rgb(206, 206, 206)",
                                margin: "0",
                              }}
                            >
                              {film.year}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </>
                  ) : (
                    <>
                      <div classNam="card-wrapper">
                        <Card
                          border="success"
                          style={{
                            backgroundColor: "transparent",
                            height: "430px",
                          }}
                        >
                          <Card.Img
                            className="d-block w-100"
                            variant="top"
                            src={film.imageUrl}
                            alt={film.title}
                            style={{
                              cursor: "pointer",
                              height: "auto",
                              maxHeight: "320px",
                              padding: "25px",
                            }}
                            onClick={() => saveMovie(film)}
                          />
                          <Card.Header
                            style={{
                              color: "rgb(206, 206, 206)",

                              paddingBottom: "0",
                            }}
                          >
                            {film.title}
                          </Card.Header>

                          <Card.Body>
                            <Card.Text
                              style={{
                                color: "rgb(206, 206, 206)",
                                margin: "0",
                              }}
                            >
                              {film.year}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </>
                  )}
                </Carousel.Item>
              );
            })}
          </Carousel>
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => loadMore()}
            style={{ marginTop: "5px" }}
          >
            Load More
          </Button>
        </div>
      )}
    </>
  );
}

export default Search;
