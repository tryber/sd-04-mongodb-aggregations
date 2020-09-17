db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      $and: [{ genres: { $ne: "Crime" } }, { genres: { $ne: "Horror" } }],
      $or: [{ rated: "G" }, { rated: "PG" }],
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
