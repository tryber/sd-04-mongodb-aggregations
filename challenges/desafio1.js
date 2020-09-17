db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      $and: [{ genres: { $ne: "Crime" } }, { genres: { $ne: "Horror" } }],
      $or: [{ rated: "G" }, { rated: "PG" }],
      languages: { $all: ["English", "Spanish"] },
    },
  },
]).itcount();
