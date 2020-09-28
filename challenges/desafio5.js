const cast = {
  $setIntersection: [
    "$cast",
    [
      "Sandra Bullock",
      "Tom Hanks",
      "Julia Roberts",
      "Kevin Spacey",
      "George Clooney"]]
};

db.movies.aggregate([
  {
    $match: {
      countries: { $in: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
    }
  },
  {
    $project: {
      _id: 0,
      num_favs: {
        $cond: {
          if: { $isArray: cast },
          then: { $size: cast },
          else: "NA"
        }
      }
    }
  },
  {
    $sort: {
      "num_favs": -1,
      "tomatoes.viewer.rating": -1,
      title: -1
    }
  },
  { $skip: 24 },
  { $limit: 1 }
]);