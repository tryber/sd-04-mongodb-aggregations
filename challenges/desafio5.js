db.movies.aggregate([
  {
    $match: {
      countries: { $eq: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  { $sort: { num_favs: 1, "tomatoes.viewer.rating": 1, title: 1 } },
  { $size: 1 },
  { $project: { num_favs: 1, _id: 0 } },
]);
