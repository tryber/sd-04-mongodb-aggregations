const favs = [
  "George Clooney",
  "Julia Roberts",
  "Kevin Spacey",
  "Sandra Bullock",
  "Tom Hanks"
];

db.movies.aggregate(
  [
    {
      $addFields: {
        num_favs: {
          $size: { $setIntersection: [favs, "$cast"] }
        }
      }
    },
    {
      $match: {
        countries: "USA",
        "tomatoes.viewer.rating": { $gte: 3 },
        cast: { $exists: true }
      }
    },
    {
      $sort: {
        num_favs: -1,
        "tomatoes.viewer.rating": -1,
        title: -1
      }
    },
    {
      $project: {
        _id: 0,
        title: 1,
      }
    },
    { $skip: 24 },
    { $limit: 1 }
  ]
);
