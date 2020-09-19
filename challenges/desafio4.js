db.movies.aggregate([
  { $addFields: { title_split: { $split: ["$title", " "] } } },
  { $match: { $expr: { $eq: [{ $size: "$title_split" }, 1] } } },
  { $sort: { title: 1 } },
  { $project: { title_split: 1, _id: 0 } },
]);
