db.movies.aggregate([
  {
    $match: {
      "awards": {
        $regex: /won \d+(?!\.) oscar/i
      }
    }
  },
  {
    $group: {
      "_id": 1,
      "maior_rating": {
        $max: "$imdb.rating"
      },
      "menor_rating": {
        $min: "$imdb.rating"
      },
      "media_rating": {
        $avg: "$imdb.rating"
      },
      "desvio_padrao": {
        $stdDevSamp: "$imdb.rating"
      }
    }
  },
  {
    $project: {
      "maior_rating": true,
      "menor_rating": true,
      "media_rating": {$round: ["$media_rating", 1]},
      "desvio_padrao": {$round: ["$desvio_padrao", 1]},
      "_id": false
    }
  }
]);
