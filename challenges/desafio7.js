db.movies.aggregate([
  {
    $match: {
      languages: "English",
      //  cast: { $exists: true },
    },
  },
  { $unwind: "$cast" },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      avg: { $avg: "$imdb.rating" },
    },
  },
  {
    $sort: { numeroFilmes: -1, _id: -1 },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$avg", 1] },
    },
  },
]);
