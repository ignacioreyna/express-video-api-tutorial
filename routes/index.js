const express = require('express');
const router = express.Router();
const axios = require('axios');
const Logger = require('../helpers/Logger');

const apiKey = process.env.TMDB_API_KEY
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
})

/* GET home page. */
router.get('/', (req, res, next) => {
  axios.get(nowPlayingUrl).then( response => {
    res.render('index', { movies:  response.data.results });
  }).catch(err => next(err));
});

router.get('/movie/:movieId', (req, res, next) => {
  const movieUrl = `${apiBaseUrl}/movie/${req.params.movieId}?api_key=${apiKey}`;
  axios.get(movieUrl).then(
      response => {
        res.render('single-movie', { movie: response.data} )
  }).catch(err => next(err))
})

router.post('/search', (req, res, next) => {
  const { cat, movieSearch } = req.body;
  const searchUrl = `${apiBaseUrl}/search/${cat}?query=${movieSearch}&api_key=${apiKey}`

  axios.get(searchUrl).then(
      response => {
        const movies = cat === 'movie' ? response.data.results : response.data.results.map(result => result.known_for);
        res.render('index', { movies })
  }).catch(err => next(err))
})

module.exports = router;
