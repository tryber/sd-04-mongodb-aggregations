db.movies.aggregate([
  { $match: { "imdb.rating": { $gte: 7 } } },
  { $match: { genres: { $nin: [ "Crime", "Horror" ] } } },
  { $match: { $or: [{ rated: "PG" }, { rated: "G" }] } },
  { $match: { $and: [{ languages: "English" }, { languages: "Spanish" }] } }
]);
