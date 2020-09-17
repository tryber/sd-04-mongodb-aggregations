// Desafio 4

db.movies.aggregate([
  {
    $addFields: { title_split: { $split: ["$title", " "] } },
  },
  {
    $match: {
      $expr: {
        $eq: [{ $size: { $split: ["$title", " "] } }, 1],
      },
    },
  },
  {
    $project: { title_split: 1, _id: 0 },
  },
  {
    $sort: { title_split: 1 },
  },
]);
