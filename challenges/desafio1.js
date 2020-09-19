db.movies.aggregate([
  {
    $match: {
      $and: [{ languages: "English" }, { languages: "Spanish" }],
      "imdb.rating": { $gte: 7 },
      genres: {
        $nin: ["Crime", "Horror"],
      },
      rated: {
        $in: ["PG", "G"],
      },
    },
  }
]);
