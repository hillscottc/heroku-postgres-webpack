import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import MovieList from "./MovieList";
import { getMovieList } from "./MovieApi";

const Index = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((data) => setMovies(data));
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <section>
        <a href="/api/movies">/api/movies</a>
      </section>
      <MovieList movies={movies} />
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById("index"));
