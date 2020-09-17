db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      $and: [{ languages: "English" }, { languages: "Spanish" }],
      $nor: [{ genres: "Crime" }, { genres: "Horror" }],
      $or: [{ rated: "PG" }, { rated: "G" }],
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
  { $sort: { ano: -1, notaIMDB: -1, titulo: 1 } },
]
);
