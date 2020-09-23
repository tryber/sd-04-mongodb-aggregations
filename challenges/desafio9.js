// A partir da coleção trips, determine o menor e o maior ano de nascimento.
db.trips.aggregate([
  {
    $match: {
      "birthYear": { $exists: 1, $ne: "" }
    }
  },
  {
    $group: {
      "_id": null,
      // Operador $toInt Converte para Inteiro.
      "maiorAnoNascimento": { $max: { $toInt: "$birthYear" } },
      "menorAnoNascimento": { $min: { $toInt: "$birthYear" } }
    }
  },
  {
    $project: {
      "_id": 0,
      "maiorAnoNascimento": 1,
      "menorAnoNascimento": 1
    }
  }
]);
