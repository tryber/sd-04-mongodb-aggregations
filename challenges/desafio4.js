db.movies.aggregate([
  {
    $addFields: {
      "title_split": { $split: ["$title", " "] },
    },
  },
  
  { $sort: {"title_split": 1} },
  {$project: {_id: 0, "title_split": 1  } }
]);
