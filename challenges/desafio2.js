db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      rated: { $in: ["G", "PG"] },
      genres: { $nin: ["Crime", "Horror"] },
      languages: { $all: ["English", "Spanish"] },
    },
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
