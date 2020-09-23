// Traga o nome do ator ou atriz, número de filmes em que participou e a média do imdb desses
// filmes com apenas uma casa decimal.
db.movies.aggregate([
  { $unwind: "$cast" },
  {
    $match: { languages: "English" },
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  {
    $sort: { numeroFilmes: -1, _id: -1 },
  },
  {
    $project: {
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
]);
