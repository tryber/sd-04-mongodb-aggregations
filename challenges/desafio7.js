db.movies.aggregate([
  {
    $match: {
      languages: "English",
    },
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: "$_id" },
      mediaIMDB: { $avg: "imdb.rating" },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
]);
