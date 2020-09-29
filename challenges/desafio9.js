db.trips.aggregate([
  {
    $match: { birthYear: { $ne: "" } }
  },
  {
    $group: {
      _id: 0,
      maiorAnoNascimento: { $max: "$birthYear" },
      menorAnoNascimento: { $min: "$birthYear" },
    }
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: { $toInt: "$maiorAnoNascimento" },
      menorAnoNascimento: { $toInt: "$menorAnoNascimento" },
    }
  }
]);
