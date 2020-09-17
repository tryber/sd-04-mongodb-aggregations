db.movies.aggregate([
  //filtra
  { $match: { languages: "English" } },
  //"desconstrói" o array do elenco
  { $unwind: "$cast" },
  //group para acesso ao avg e setar _id como $cast
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  //ordena
  { $sort: { numeroFilmes: -1, _id: -1 } },
  //projeta com round
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
]);
