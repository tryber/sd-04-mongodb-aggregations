  db.movies.aggregate([
    { $project: { title_split: { $split: ["$title", " "] }, _id: 0 } },
    { $match: { $expr: { $eq: [{ $size: "$title_split" }, 1] } } },
    { $sort: { title_split: 1 } }
  ]);
