db.movies.aggregate([
  {
    $match: {
      $expr: {
        $eq: [{ $size: { $split: ["$title", " "] } }, 1],
      },
    },
  },
  {
    $project: {
      _id: false,
      title_split: { $split: ["$title", " "] },
    },
  },
  {
    $sort: {
      title_split: 1,
    },
  }
]);
