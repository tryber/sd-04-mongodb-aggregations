db.movies.aggregate([
  {
    $addFields: {
      title_split: ["$title"],
    },
  },
  { $match: { $expr: { $eq: [{ $size: { $split: ["$title", " "] } }, 1] } } },
  { $project: { _id: 0, title_split: 1 } },
  { $sort: { title_split: 1 } },
]);
