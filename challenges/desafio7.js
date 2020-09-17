db.movies.aggregate([
  {
    $group: {
      _id: "$cast",
      numeroFilmes: {$count: {"$_id"}},
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
      mediaIMDB: 1,
    },
  },
]);
