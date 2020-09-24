db.movies.aggregate([// Seleciono(aggregates) os movies
  {
    $match: {
      $and: [
        { "imdb.rating": { $gte: 7 } },// comparando os rating em imdb maiores ou igual ($gte) a 7
        { genres: { $nin: ["Crime", "Horror"] } },// Não incluindo ($nin) os generos Crime e Horror
        { rated: { $in: ["PG", "G"] } },// Incluindo ($in) as classificações
        { languages: { $all: ["English", "Spanish"] } },// Selecionando todas ($all) com linguagem em Esp e Ing
      ],
    },
  },
  {
    $project: {
      _id: 0,
      titulo: "$title",// Modifica $title para titulo
      avaliado: "$rated",// Modifica $rated para avaliado
      notaIMDB: "$imdb.rating",// Modifica $imdb.rating para notaIMDB
      votosIMDB: "$imdb.votes",// Modifica $imdb.votes para votosIMDB
      ano: "$year",// Modifica $year para ano
    },
  },
]);
