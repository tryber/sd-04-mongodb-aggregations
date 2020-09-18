db.movies.aggregate([
  // adicionando o campo
  // fazendo o split para separar a string dentro do array
  {
    $addFields: {
      title_split: {
        $split: ["$title", " "],
      },
    },
  },
  // fazendo o match com quem só tem 1 palavra
  {
    $match: {
      title_split: {
        $size: 1,
      },
    },
  },
  //projetando a resposta para não ficar vendo tudo!
  {
    $project: {
      _id: 0,
      title_split: 1,
    },
  },
  // colocando em ordem alfabética
  {
    $sort: {
      title_split: 1,
    },
  },
]);
