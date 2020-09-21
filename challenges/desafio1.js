db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      $and: [{ languages: "English" }, { languages: "Spanish" }],
      $nor: [{ genres: "Crime" }, { genres: "Horror" }],
      $or: [{ rated: "PG" }, { rated: "G" }],
    },
  },
]);
