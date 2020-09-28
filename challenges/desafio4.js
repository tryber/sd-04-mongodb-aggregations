db.movies.aggregate([
  {
    $project: {
      _id: 0,
      "title_split": { $slice: [{ $split: ['$title', " "] }, 1] }
    },
  },
]);
 