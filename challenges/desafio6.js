db.movies.aggregate([
  {$match: {awards: {$regex: /won \d+ oscars?/i}}},
  {$group: {
    _id: null,
    maior: {$max: "$imdb.rating"},
    menor : {$min: "$imdb.rating"},
    media: {$avg: "$imdb.rating"},
    desvio: {$stdDevSamp: "$imdb.rating"}}},
  {$project: {
    _id: 0,
    "maior_rating" : "$maior",
    "menor_rating" : "$menor",
    "media_rating" : {$round: ["$media", 1]},
    "desvio_padrao" : {$round: ["$desvio", 1]}}}
]);
