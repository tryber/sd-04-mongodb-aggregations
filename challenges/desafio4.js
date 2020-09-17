db.movies.aggregate([
  {
    $match: {},
  },
  {
    $project: {
      _id: 0,
      title_split: { $split: ["$title", " "] },
    },
  },
  {
    $sort: {
      title_split: 1,
    },
  },
]);
