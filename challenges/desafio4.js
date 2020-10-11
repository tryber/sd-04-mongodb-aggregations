db.movies.aggregate([
  { $project: { _id: false, title_split: { $split: ["$title", " "] } } },
  {
    $match: { $expr: { $eq: [{ $size: "$title_split" }, 1] } },
  },
  { $sort: { title_split: 1 } },
]);
