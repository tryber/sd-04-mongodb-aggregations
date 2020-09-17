// A partir da coleção trips, determine o menor e o maior ano de nascimento. Guarde essa informação, você precisará dela mais tarde.

// Não considere documentos com valores vazios ("") ou em que o campo não existe!

db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: 1, $ne: "" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
      menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    },
  },
]);
