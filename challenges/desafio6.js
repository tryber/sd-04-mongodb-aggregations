/*
Desafio 6
Considerando todos os filmes que ganharam o Oscar pelo menos uma vez, calcule o maior valor, menor valor,
média e o desvio padrão das avaliações (campo imdb.rating). Para a média e o desvio padrão arredonde
os valores para uma casa decimal utilizando o $round.
*/
db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /Won \d\d? Oscar/ },
    },
  },
  //{ $sort: { awards: -1 } },
  //{ $count: "numeroDeGanhadoresDoOscar" },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: { $round: ["$maior_rating", 1] },
      menor_rating: { $round: ["$menor_rating", 1] },
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
]);
