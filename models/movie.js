// requiring the dbConnect with pg promise and the config file already inside pgp
const db = require('../lib/dbConnect');

// Your middleware MUST allow limit and offset to be sent
// via query parameters to the db for filtering
// default limit DETERMINES HOW MANY SHOW
const limit = 10;
// default offset
const offset = 0;

function getAllMovies(req, res, next) {
// implement get all movies
  console.log('---> inside get All movies');
  // using the db that we required on the top of this file
  db.query(`SELECT * FROM movies LIMIT ${limit} OFFSET ${offset};`)
    .then((data) => {
      // equivalent to the toArray in MongoDB
      res.rows = data;
      next();
    })
    .catch((err) =>  {
      next(err);
    })
}

function getMovie(req, res, next) {
  // implement get single movie
  console.log('---> inside getMovie by ID');
  // THIS IS INPUT SANITATION, making whatever has been inputed to be INT
  req.body.movieID = Number.parseInt(req.params.id)
  console.log(`value for req.body.movieID sanitation is = ${req.body.movieID}`);
  //db.many//db.one//db.none//db.anyd//db.oneOrNone//db.manyOrNone
  db.one(`
    SELECT *
    FROM movies
    WHERE id = $/id/
    `, req.params)
    .then((data) => {
      // equivalent to toArray in MongoDB
      res.rows = data;
      console.log(data);
      next();
    })
    .catch((err) => {
      next(err);
    })
}

function updateMovie(req, res, next) {
  // implement update
  console.log('---> inside updateMovie');
  // changing Toy Story
  console.log(`id = ${req.params.id} || title = ${req.body.title}`);
  req.body.id = Number.parseInt(req.params.id);
  // let newTitle = req.params.title;
  // console.log(`id:${searchID}, title:${newTitle}`);
  db.none(`
    UPDATE movies
    SET title = $/title/
    WHERE id = $/id/
    `,
    req.body)
    .then((data) => {
      next();
    })
    .catch((err) => {
      next(err);
    })
}

function deleteMovie(req, res, next) {
  // implement delete
  console.log('---> inside deleteMovie');
  req.body.id = Number.parseInt(req.params.id);
  db.none(`
    DELETE FROM movies
    WHERE id = $/id/
    `, req.body)
    .then((data) => {
      next();
    })
    .catch((err) => {
      next(err)
    })
}

// BONUS
function getAllMoviesWithRatings(req, res, next) {

}

module.exports = {
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  getAllMoviesWithRatings
};
