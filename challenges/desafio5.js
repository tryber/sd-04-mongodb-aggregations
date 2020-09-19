db.movies.aggregate([
  {
    $match: {
      $and: [{ countries: "USA" }, { "tomatoes.viewer.rating": { $gte: 3 } }],
    },
  },
  {
    $project: {
      _id: 0,
      num_favs: {
        $size: {
          $setIntersection: [
            [
              "Sandra Bullock",
              "Tom Hanks",
              "Julia Roberts",
              "Kevin Spacey",
              "George Clooney",
            ],
            { $ifNull: ["$cast", []] },
          ],
        },
      },
      title: 1,
      "tomatoes.viewer.rating": 1,
    },
  },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  {
    $project: {
      title: 1,
    },
  },
  { $skip: 24 },
  { $limit: 1 },
]);
