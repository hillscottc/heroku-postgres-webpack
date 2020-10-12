import React from "react";
import * as XDate from "xdate";
// import "./MovieList.css";

const getFormattedDate = (date) => {
  if (!date) return null;
  const dateObj = new XDate(date);
  return dateObj.toString("M/d/yy h(:mm)TT");
};

const MovieRow = ({ movie }) => {
  const { id, title, year, created_at, updated_at } = movie;

  const handleDelete = (id, e) => {
    e.preventDefault();
    console.log("DELETE!!!!");
    // deleteAlbum(id);
  };

  return (
    <div>
      <button onClick={(e) => handleDelete(id, e)}>X</button>
      <div>{id}</div>
      <div>{title}</div>
      <div>{year}</div>
      <div>{getFormattedDate(created_at)}</div>
      <div>{getFormattedDate(updated_at)}</div>
    </div>
  );
};

const MovieList = ({ movies }) => {
  return (
    <main className="grid">
      {/* <header className="grid__header">
        {["Id", "Artist", "Title", "Year", "Condition", "Created At"].map(
          (heading) => (
            <div key={heading} className="grid__header__item">
              {heading}
            </div>
          )
        )}
      </header> */}
      <section className="grid__body">
        {!movies && <div>"There is no movie data available."</div>}
        {movies &&
          movies.map((movie) => (
            <MovieRow
              key={movie.id}
              movie={movie}
              // deleteAlbum={deleteAlbum}
              // isOdd={isOdd}
            />
          ))}
      </section>
    </main>
  );
};
export default MovieList;
