db.movies.updateMany(
  {},
  {
    $push: {
      atores: {
        $each: [
          "Sandra Bullock",
          "Tom Hanks",
          "Julia Roberts",
          "Kevin Spacey",
          "George Clooney",
        ],
      },
    },
  }
);

db.movies.aggregate([
  {
    $match: {
      "tomatoes.viewer.rating": { $gte: 3 },
      countries: { $in: ["USA"] },
      cast: { $exists: true },
    },
  },
  {
    $addFields: {
      num_favs: { $size: { $setIntersection: ["$cast", "$atores"] } },
    },
  },
  {
    $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 },
  },
  { $skip: 24 },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      title: true,
    },
  },
]);
