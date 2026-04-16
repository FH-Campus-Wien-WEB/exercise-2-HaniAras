const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movies = require('./movie-model.js');

const app = express();

// Parse JSON bodies (brauchen wir für PUT, damit req.body funktioniert)
app.use(bodyParser.json());

// Statische Dateien aus dem 'files' Ordner bereitstellen
app.use(express.static(path.join(__dirname, 'files')));

// Task 1.2 — alle Filme als Array zurückgeben
app.get('/movies', function (req, res) {
  res.json(Object.values(movies))
})

// Task 2.1 — einen einzelnen Film per imdbID zurückgeben
app.get('/movies/:imdbID', function (req, res) {
  const id = req.params.imdbID
  const movie = movies[id]

  if (movie) {
    res.send(movie)
  } else {
    res.sendStatus(404)
  }
})

// Task 3.1 & 3.2 — Film aktualisieren oder neu anlegen
app.put('/movies/:imdbID', function (req, res) {
  const id = req.params.imdbID
  const movieData = req.body

  if (movies[id]) {
    // Film existiert bereits → aktualisieren
    movies[id] = movieData
    res.sendStatus(200)
  } else {
    // Film existiert nicht → neu anlegen
    movies[id] = movieData
    res.status(201).send(movieData)
  }
})

app.listen(3000)
console.log("Server now listening on http://localhost:3000/")