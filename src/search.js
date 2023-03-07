import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useState } from "react";
import axios from "axios";

var Buffer = require("buffer/").Buffer;

function Search(props) {
  const [results, setResults] = useState([]); //return of axios call
  const [input, setInput] = useState(""); //what the user types into search bar
  const [savedMovies, setSavedMovies] = useState([]); //list of movies saved by user

  const [selectedLink1, setSelectedLink1] = useState('');
  const [selectedLink2, setSelectedLink2] = useState('');
  
  const handleDropDownMenuChange1 = (e) => {
     setSelectedLink1(e.target.value);
  }

  const handleDropDownMenuChange2 = (e) => {
    setSelectedLink2(e.target.value);
 }

  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheckboxChange = (event) => {
    setSelectedCheckbox(event.target.value);
  }

  
  const token = `${"ma8uksnn1e"}:${"p2z0os6mqq"}`;
  const encodedToken = Buffer.from(token).toString("base64");

  const client = axios.create({
    withCredentials: true,
    baseURL: "https://osu-cse-search-4067143756.us-east-1.bonsaisearch.net",
    headers: { Authorization: "Basic " + encodedToken },
  });

  //TODO: change submit handler to parse the elastic search query.
  const handleSubmit = async (e) => {
    e.preventDefault(); //don't refresh page when submitted
    var esQuery = null;
    if (input !== "") {
        if(selectedCheckbox === 'title'){         
          esQuery = {
            query: {
              match: {
                primaryTitle: input
              }
            }
          };
        } else if(selectedCheckbox === 'genre'){
            esQuery = {
              query: {
                match: {
                  genres: input
                }
              }
            };
        } else if (selectedCheckbox === 'year'){
            esQuery = {
              query: {
                match: {
                  startYear: input
                }
              }
            };

        } else if (selectedCheckbox === 'actor'){
            esQuery = {
              query: {
                match: {
                  actor: input
                }
              }
            };
        } else if (selectedCheckbox === 'actress'){
            esQuery = {
              query: {
                match: {
                  actress: input
                }
              }
            };
        } else if (selectedCheckbox === 'writer'){
            esQuery = {
              query: {
                match: {
                  writer: input
                }
              }
            };
        } else if (selectedCheckbox === 'director'){
            esQuery = {
              query: {
                match: {
                  director: input
                }
              }
            };
        } else if (selectedCheckbox === 'producer'){
            esQuery = {
              query: {
                match: {
                  producer: input
                }
              }
            };
        } else {
          esQuery = {
            query: {
              match: {
                primaryTitle: input
              }
            }
          };
        } 
        client.post('/imdb/_search', esQuery)
        .then(response => {
          console.log(response.data.hits.hits);
          let queryReturn = [];
          response?.data?.hits?.hits.forEach((film) => {
            let cur = {};
            cur.id = film.id;
            cur.title = film._source.primaryTitle;
            cur.year = film._source.startYear;
            cur.rating = film._source.averageRating;
            cur.imageUrl = film._source.imageUrl;
            queryReturn.push(cur);
          }); 
          setResults(queryReturn);
        })
        .catch(error => {
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

  function showMoviePlayList(){
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
    )
  }
  </>
 );
}

function showMovieCheckboxes(){
    return(
        <Form>
            <label class="check">
                <input
                    type="checkbox"
                    value="title"
                    checked={selectedCheckbox === 'title'}
                    onChange={handleCheckboxChange}
                />
                Movie Title
                <span class="box"></span>
            </label>  
            <label class="check">
                <input
                    type="checkbox"
                    value="genre"
                    checked={selectedCheckbox === 'genre'}
                    onChange={handleCheckboxChange}
                />
                Genre
                <span class="box"></span>
            </label>
            <label class="check">
                <input
                    type="checkbox"
                    value="year"
                    checked={selectedCheckbox === 'year'}
                    onChange={handleCheckboxChange}
                />
                Year
                <span class="box"></span>
            </label>
            <label class="check">
                <input
                    type="checkbox"
                    value="actor"
                    checked={selectedCheckbox === 'actor'}
                    onChange={handleCheckboxChange}
                />
                Actor
                <span class="box"></span>
            </label>
            <label class="check">
                <input
                    type="checkbox"
                    value="actress"
                    checked={selectedCheckbox === 'actress'}
                    onChange={handleCheckboxChange}
                />
                Actress
                <span class="box"></span>
            </label>
            <label class="check">
                <input
                    type="checkbox"
                    value="writer"
                    checked={selectedCheckbox === 'writer'}
                    onChange={handleCheckboxChange}
                />
                Writer
                <span class="box"></span>
            </label>
            <label class="check">
                <input
                    type="checkbox"
                    value="director"
                    checked={selectedCheckbox === 'director'}
                    onChange={handleCheckboxChange}
                />
                Director
                <span class="box"></span>
            </label>
            <label class="check">
                <input
                    type="checkbox"
                    value="producer"
                    checked={selectedCheckbox === 'producer'}
                    onChange={handleCheckboxChange}
                />
                Producer
                <span class="box"></span>
            </label>
      </Form>
    )
}
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
      <h1 className= "WelcomeMessage"> Welcome to FlickMe! Look up any movie, song, or TV show and save it to your playlist! </h1>
         <div class = "dropdown">
            <select value={selectedLink1} onChange={handleDropDownMenuChange1}>
                <option value="">View My Playlists:</option>
                <option value="moviePlaylist">My Movie Playlist</option>
                <option value="songPlaylist">My Song Playlist</option>
                <option value="tvPlaylist">My TV Show Playlist</option>
            </select>
            {selectedLink1 === 'moviePlaylist' && showMoviePlayList()}
        </div> 
      <h3 className="SearchBarTitle">ElasticMedia</h3>
        <div class = "dropdown2">
            <select value={selectedLink2} onChange={handleDropDownMenuChange2}>
                <option value="">Select a form of media:</option>
                <option value="movies">Movies</option>
                <option value="songs">Songs</option>
                <option value="tv">TV Shows</option>
            </select>
            {selectedLink2 === 'movies' && showMovieCheckboxes()}
        </div> 
      <Form onSubmit={handleSubmit} className="search-bar">
        <InputGroup className="mb-3" size="lg">
          <Form.Control
            placeholder="Search your media"
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
      </Form>
      {results.length > 0 && (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>
                Title
                <Button
                  className="sort-button"
                  onClick={() => sortTitle(results)}
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
            {results.map((film) => {
              return (
                <tr>
                  <td>{film.title}</td>
                  <td>{film.year}</td>
                      <td>{film.rating}</td>
                      <td><img src={film.imageUrl} /></td>
                  <td className="d-grid gap-2" style={{ textAlign: "center" }}>
                    {savedMovies.includes(film) ? (
                      <Button
                        variant="danger"
                        id="button-addon2"
                        size="sm"
                        onClick={() => deleteMovie(film)}
                      >
                        Unsave
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
                    )}
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

export default Search;
