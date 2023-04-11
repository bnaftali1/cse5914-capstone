import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useState } from "react";

import axios from "axios";
import Carousel from "react-grid-carousel";
import Card from "react-bootstrap/Card";
var Buffer = require("buffer/").Buffer;


function SavedMoviesPage({ savedMovies, setSavedMovies }) {
    const [recommendedMovies, setRecommendedMovies] = useState([]);

    const token = `${"ma8uksnn1e"}:${"p2z0os6mqq"}`;

    const encodedToken = Buffer.from(token).toString("base64");

 

    const saveMovie = (film) => {
        if (!savedMovies.includes(film)) {
            setSavedMovies((savedMovies) => [...savedMovies, film]);
        }
    };
    const client = axios.create({
        withCredentials: true,
        baseURL: "https://osu-cse-search-4067143756.us-east-1.bonsaisearch.net",
        headers: { Authorization: "Basic " + encodedToken },
    });

    const recommend_query = () => {
        var rec_query = null;
        const movie_ids = savedMovies.map((film) => film.id);
        const like = movie_ids.map((id) => ({ _index: "imdb", _id: id }));
        var movie_query = "";
        for (var i = 0; i < movie_ids.length; i++) { }
        rec_query = {
            query: {
                more_like_this: {
                    fields: ["genres"],

                    like,
                    min_term_freq: 1,
                    max_query_terms: 12,
                },
            },
        };
        client.post("/imdb/_search", rec_query).then((response) => {
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
            setRecommendedMovies(queryReturn);
        });
    };
    //TODO: change submit handler to parse the elastic search query.
    
   const deleteMovie = (deleteFilm) => {
        setSavedMovies((savedMovies) =>
            savedMovies.filter((film) => film.id !== deleteFilm.id)
        );
    };
    const sortTitle = (target) => {
        const sortedTitles = [...target].sort((a, b) => {
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            if (nameA < nameB) {
                return 1;
            }
            if (nameA > nameB) {
                return -1;
            }
            return 0;
        });
        setSavedMovies(sortedTitles);

    };

    const sortTitleReverse = (target) => {
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

    };

    const sortYear = (target) => {
        const sortedYears = [...target].sort((a, b) => {
            const yearA = a.year;
            const yearB = b.year;
            if (yearA < yearB) {
                return 1;
            }
            if (yearA > yearB) {
                return -1;
            }
            return 0;
        });
        setSavedMovies(sortedYears);

    };

    const sortYearReverse = (target) => {
        const sortedYears = [...target].sort((a, b) => {
            const yearA = a.year;
            const yearB = b.year;
            if (yearA < yearB) {
                return -1;
            }
            if (yearA > yearB) {
                return 1;
            }
            return 0;
        });
        setSavedMovies(sortedYears);

    };

    const sortRating = (target) => {
        const sortedRatings = [...target].sort((a, b) => {
            const ratingA = a.rating;
            const ratingB = b.rating;
            if (ratingA < ratingB) {
                return 1;
            }
            if (ratingA > ratingB) {
                return -1;
            }
            return 0;
        });
        setSavedMovies(sortedRatings);

    };

    const sortRatingReverse = (target) => {
        const sortedRatings = [...target].sort((a, b) => {
            const ratingA = a.rating;
            const ratingB = b.rating;
            if (ratingA < ratingB) {
                return -1;
            }
            if (ratingA > ratingB) {
                return 1;
            }
            return 0;
        });
        setSavedMovies(sortedRatings);

    };

    
        return (
            <>
                
                {savedMovies.length > 0 && (
                    <>
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
                                    <Button
                                        className="sort-button"
                                        onClick={() => sortTitleReverse(savedMovies)}
                                    >
                                        ↑
                                    </Button>
                                </th>
                                <th>
                                    Release Year
                                    <Button
                                        className="sort-button"
                                        onClick={() => sortYear(savedMovies)}
                                    >
                                        ↓
                                    </Button>
                                    <Button
                                        className="sort-button"
                                        onClick={() => sortYearReverse(savedMovies)}
                                    >
                                        ↑
                                    </Button>
                                </th>
                                <th>
                                    Rating
                                    <Button
                                        className="sort-button"
                                        onClick={() => sortRating(savedMovies)}
                                    >
                                        ↓
                                    </Button>
                                    <Button
                                        className="sort-button"
                                        onClick={() => sortRatingReverse(savedMovies)}
                                    >
                                        ↑
                                    </Button>
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
                        <Button onClick={() => recommend_query()} type="button" class="btn btn-outline-secondary">Recommendations!</Button>
                    </>
                )}
                <div class="dropdown">
                    <div>
                    {recommendedMovies.length > 0 && (
                            <div>
                       
                            <Carousel cols={5} rows={1} gap={10} loop>
                                {recommendedMovies.map((film) => {
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
                            
                        </div>
                    )}


                    </div>
                </div>

            </>
        );
    }
export default SavedMoviesPage;