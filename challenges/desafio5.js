const fav = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  //filtra
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
      // sem a condição exists, o resultado de size volta null
      cast: { $exists: 1 },
    },
  },
  //cria novo campo
  {
    $addFields: { num_favs: { $size: { $setIntersection: [fav, "$cast"] } } },
  },
  //ordena
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  //limita
  { $skip: 24 },
  { $limit: 1 },
  //projeta
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
]);
