db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      rated: { $in: ["G", "PG"] },
      genres: { $nin: ["Crime", "Horror"] },
      languages: { $all: ["English", "Spanish"] },
    },
  },
]);
