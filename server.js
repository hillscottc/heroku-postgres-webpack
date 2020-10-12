const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();
const movie_model = require("./movie_model");

// create application/json parser, to handle json uploads
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
// <https://stackoverflow.com/questions/9177049/express-js-req-body-undefined>
const urlencodedParser = bodyParser.urlencoded({ extended: false });

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
app.post("/api/movies", jsonParser, (req, res) => {
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

// EXAMPLE FOR FORM DATA <https://stackoverflow.com/questions/9177049/express-js-req-body-undefined>
// // POST /login gets urlencoded bodies
// app.post('/login', urlencodedParser, function (req, res) {
//   res.send('welcome, ' + req.body.username)
// })


app.listen(port);
