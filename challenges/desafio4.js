// Crie um pipeline que adicione um campo title_split contendo a lista de palavras presentes em title e retorne apenas o novo campo title_split dos filmes com o título composto apenas de uma palavra, ordernando-os por title em ordem alfabética.

db.movies.aggregate([
  {
    $addFields: {
      title_split: {
        $split: ["$title", " "],
      },
    },
  },
  {
    $match: {
      title_split: {
        $size: 1,
      },
    },
  },
  {
    $project: {
      _id: 0,
      title_split: 1,
    },
  },
  {
    $sort: {
      title_split: 1,
    },
  },
]);
