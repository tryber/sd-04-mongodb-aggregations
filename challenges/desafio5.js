db.movies.aggregate([
  {
    $match: {
      countries: { $in: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $addFields: {
      num_favs: {
        $cond: {
          if: { $isArray: "$cast" },
          then: {
            $size: {
              $setIntersection: [
                [
                  "Sandra Bullock",
                  "Tom Hanks",
                  "Julia Roberts",
                  "Kevin Spacey",
                  "George Clooney",
                ],
                "$cast",
              ],
            },
          },
          else: 0,
        },
      },
    },
  },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $project: { title: 1, _id: 0 } },
  { $skip: 24 },
  { $limit: 1 },
]);
