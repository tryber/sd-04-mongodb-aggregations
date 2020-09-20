db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      languages: { $all: ["English", "Spanish"] },
      rated: { $in: ["G", "PG"] },
      genres: { $nin: ["Crime", "Horror"] },
    },
  },
  {
    $sort: { year: -1, "imdb.rating": -1, title: 1 },
  },
  {
    $project: {
      _id: 0,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
]);
