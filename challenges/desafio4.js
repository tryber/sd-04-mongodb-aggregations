db.movies.aggregate([
  {
    $addFields: {
      title_split: { $split: ["$title", " "] },
    },
  },
  {
    $match: {
      $expr: { $eq: [{ $size: "$title_split" }, 1] },
    },
  },
  {
    $project: { _id: false, title_split: true },
  },
  {
    $sort: { title_split: 1 },
  },
]);
