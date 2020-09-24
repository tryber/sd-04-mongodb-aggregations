db.movies.aggregate([
  {
    $match: {
      languages: { $all: ["English", "Spanish"] },
      genres: { $nin: ["Crime", "Horror"] },
      "imdb.rating": { $gte: 7 },
      rated: { $in: ["G", "PG"] },
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
