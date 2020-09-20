db.movies.aggregate([
  {
    $match: {
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["G", "PG"] },
      languages: { $all: ["English", "Spanish"] },
      "imdb.rating": { $gte: 7 },
    },
  },
]);
