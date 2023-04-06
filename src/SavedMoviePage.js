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

function SavedMoviesPage(props) {
   const deleteMovie = (deleteFilm) => {
        props.setSavedMovies((savedMovies) =>
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
        props.setSavedMovies(sortedTitles);

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
        props.setSavedMovies(sortedTitles);

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
        props.setSavedMovies(sortedYears);

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
        props.setSavedMovies(sortedYears);

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
        props.setSavedMovies(sortedRatings);

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
        props.setSavedMovies(sortedRatings);

    };

    
        return (
            <>
                {props.savedMovies.length > 0 && (
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>
                                    Title{" "}
                                    <Button
                                        className="sort-button"
                                        onClick={() => sortTitle(props.savedMovies)}
                                    >
                                        ↓
                                    </Button>
                                    <Button
                                        className="sort-button"
                                        onClick={() => sortTitleReverse(props.savedMovies)}
                                    >
                                        ↑
                                    </Button>
                                </th>
                                <th>
                                    Release Year
                                    <Button
                                        className="sort-button"
                                        onClick={() => sortYear(props.savedMovies)}
                                    >
                                        ↓
                                    </Button>
                                    <Button
                                        className="sort-button"
                                        onClick={() => sortYearReverse(props.savedMovies)}
                                    >
                                        ↑
                                    </Button>
                                </th>
                                <th>
                                    Rating
                                    <Button
                                        className="sort-button"
                                        onClick={() => sortRating(props.savedMovies)}
                                    >
                                        ↓
                                    </Button>
                                    <Button
                                        className="sort-button"
                                        onClick={() => sortRatingReverse(props.savedMovies)}
                                    >
                                        ↑
                                    </Button>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.savedMovies.map((film) => {
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
               
            </>
        );
    }
export default SavedMoviesPage;