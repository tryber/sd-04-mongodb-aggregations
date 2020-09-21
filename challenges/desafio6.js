db.movies.aggregate([
  { $match: { awards: { $regex: /won \d oscar/i } } },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      min: { $min: "$imdb.rating" },
      avg: { $avg: "$imdb.rating" },
      des: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: { $round: ["$min", 1] },
      media_rating: { $round: ["$avg", 1] },
      desvio_padrao: { $round: ["$des", 1] },

      title: 1,
    },
  },
]);
