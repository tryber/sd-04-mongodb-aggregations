const fav_list = [
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
      cast: { $exists: true }
      }
  },
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: [fav_list, "$cast"]
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      title: 1,
      //  num_favs: 1
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
    $skip: 24
  },
  {
    $limit: 1
  }
]);
