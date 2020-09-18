db.movies.aggregate([
    {
      $match: {
        $and: [
          { "tomatoes.viewer.rating": { $gte: 3 } },
          { "cast": { $in: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"] } },
          { "countries": "USA"}
        ],
      },
    },
    {$project: {_id:0 }},
    {size: }
    {$sort: { "num_favs": -1, "tomatoes.viewer.rating": -1, "title": 1 }},
  ]).pretty();
