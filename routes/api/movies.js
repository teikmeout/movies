const express = require('express');
const router = express.Router();
const { getAllMovies, getMovie, getAllMoviesWithRatings } = require('../../models/movie');
const sendJSONresp = (req, res) => res.json(res.rows);
// handle all the routes

// get all movies
// this has already been routed from '/movies'
router.route('/')
  .get(getAllMovies, sendJSONresp);

// get movie by ID
router.route('/:id')
  .get(getMovie, sendJSONresp);
// Get movies withrating BONUS

// Get single movie

module.exports = router;
