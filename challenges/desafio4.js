db.movies.aggregate([
  {
    $project: {
      _id: 0,
      "title_split": { $slice: [{ $split: ['$title', " "] }, 0, 1] }
    },

  },
  { $sort: { title_split: 1 } }
]);
