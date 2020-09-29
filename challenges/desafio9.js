db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: 1 },
      birthYear: { $ne: "" }
    }
  },
  {
    $project: {
      _id: null,
      maiorAnoNascimento: { $toInt: "$birthYear" },
      menorAnoNascimento: { $toInt: "$birthYear" },
    }
  },
  {
    $group: {
      _id: 0,
      maiorAnoNascimento: { $max: "$maiorAnoNascimento" },
      menorAnoNascimento: { $min: "$menorAnoNascimento" },
    }
  },
]);
