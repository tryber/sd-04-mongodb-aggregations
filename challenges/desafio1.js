db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      $and: [{ languages: "English" }, { languages: "Spanish" }],
      $nor: [{ genres: "Crime" }, { genres: "Horror" }],
      $or: [{ rated: "PG" }, { rated: "G" }],
    },
  },
  // {
  //   $project: { title: 1, genres: 1, languages: 1, rated: 1, "imdb.rating": 1 },
  // },
]);
