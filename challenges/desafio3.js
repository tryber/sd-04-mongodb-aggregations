db.movies.aggregate([
  { $match: { "imdb.rating": { $gte: 7 } } },
  { $match: { genres: { $nin: [ "Crime", "Horror" ] } } },
  { $match: { $or: [{ rated: "PG" }, { rated: "G" }] } },
  { $match: { $and: [{ languages: "English" }, { languages: "Spanish" }] } },
  { $project: {
    _id: 0,
    titulo: "$title",
    avaliado: "$rated",
    notaIMDB: "$imdb.rating",
    votosIMDB: "$imdb.votes",
    ano: "$year"
  } },
  { $sort: { ano: -1, notaIMDB: -1, titulo: 1 } }
]);
