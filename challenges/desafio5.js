const fav_actors = [
  "George Clooney",
  "Julia Roberts",
  "Kevin Spacey",
  "Sandra Bullock",
  "Tom Hanks"
];

db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $exists: true },
    },
  },
  {
    $set: {
      num_favs: {
        $size: {
          $setIntersection: ["$cast", fav_actors],
        },
      },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: false,
      title: true,
    },
  }
]);
