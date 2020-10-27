db.movies.aggregate([
  {
    $match: {
      "countries": "USA",
      "tomatoes.viewer.rating": {$gt: 2},
      "cast": {$exists: true}
    }
  },
  {
    $set: {
      "num_favs": {
        $size: {
          $setIntersection: ["$cast", ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"]]
        }
      }
    }
  },
  {
    $sort: {
      "num_favs": -1,
      "tomatoes.viewer.rating": -1,
      "title": -1
    }
  },
  {
    $skip: 24
  },
  {
    $limit: 1
  },
  {
    $project: {
      "title": true,
      "_id": false
    }
  }
]);
