db.movies.aggregate([
  {
    $match: {
      //  titulos com tamanho = 1
      $expr: {
        $eq: [
          { $size: { $split: ["$title", " "] } },
          1
        ]
      }
    }
  },
  {
    $sort: {
      title_split: 1
    }
  },
  {
    $project: {
      _id: 0,
      //  Com $split a resposta fica no formato esperado pelo teste
      //  { "title_split" : [ "titulo" ] } ao invés de
      //  { "title_split" : "titulo" }
      title_split: { $split: ["$title", " "] }
    }
  }
]);
