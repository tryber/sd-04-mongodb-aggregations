// Vamos nos aprofundar um pouco mais em nossa coleção de filmes. Queremos contar quantos filmes cada um dos atores e atrizes do elenco (cast) já participou e obter uma média do campo imdb.rating para cada um desses atores e atrizes.

// Traga o nome do ator ou atriz, número de filmes em que participou e a média do imdb desses filmes arredondada para uma casa decimal usando o operador $round. Considere somente os membros do elenco de filmes com o idioma inglês (English). Exiba a lista em ordem decrescente de documentos pelo número de filmes e nome do ator ou atriz.

db.movies.aggregate([
  {
    $match: { languages: "English" },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  {
    $sort: { numeroFilmes: -1, _id: -1 },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
]);
