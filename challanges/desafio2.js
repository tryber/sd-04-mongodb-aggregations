db.movies.aggregate([
  {
    $match: {
      $and: [
        { "imdb.rating": { $gt: 7 } },
        { genres: { $nin: ["Crime", "Horror"] } },
        { rated: { $in: ["PG", "G"] } },
        { languages: { $in: ["English", "Spanish"] } }
      ],
    },
  },
  {
    $project: {
      _id: false,
      titulo: "$title",
      avaliado: "$rating",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  }
]);
