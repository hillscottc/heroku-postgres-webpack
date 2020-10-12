import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  useQuery,
  useMutation,
  QueryCache,
  ReactQueryCacheProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";

const queryCache = new QueryCache();

const MovieList = () => {
  const { isLoading, error, data } = useQuery("movieData", () =>
    fetch("/api/movies").then((res) => res.json())
  );

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {data &&
        data.map((movie) => (
          <div key={movie.id}>
            <div>{movie.title}</div>
          </div>
        ))}
    </div>
  );
};

const MovieAdd = () => {
  const [title, setTitle] = React.useState("");

  // const [mutatePostTodo] = useMutation(
  //   (text) => axios.post("/api/data", { text }),
  //   {
  //     onSuccess: () => {
  //       // Query Invalidations
  //       // queryCache.invalidateQueries('todos')
  //       setText("");
  //     },
  //   }
  // );

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("SUBMIT!");
          // mutatePostTodo(text);
        }}
      >
        title:{" "}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

const Index = () => {
  return (
    <>
      <ReactQueryCacheProvider queryCache={queryCache}>
        Hello React! You are ready for heroku
        <section>
          <a href="/api/movies">/api/movies</a>
        </section>
        <MovieList />
        <MovieAdd />
      </ReactQueryCacheProvider>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById("index"));
