db.movies.aggregate([
  {
    $match: {
      $expr: {$eq: [{$size: { $split: ["$title", " "] }},1]}
    }
  },
  {
    $project: {
      "title_split": "$title",
      "_id": false
    }
  },
  {
    $sort: {
      title_split: 1
    }
  }
]);
