const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();
const movie_model = require("./movie_model");

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));

// web root
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

// movie list
app.get("/api/movies", (req, res) => {
  movie_model
    .getMovies()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// add a movie
app.post("/api/movies", (req, res) => {
  console.log("ADD A MOVIE!", req.body);

  movie_model
    .createMovie(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// delete a movie
app.delete("/api/movies/:id", (req, res) => {
  movie_model
    .deleteMovie(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port);
