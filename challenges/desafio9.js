db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: 1 },
      birthYear: { $ne: "" }
    }
  },
  {
    $addFields: {
      year: { $toInt: "$birthYear" }
    }
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$year" },
      menorAnoNascimento: { $min: "$year" },
    }
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: { $toInt: "$maiorAnoNascimento" },
      menorAnoNascimento: { $toInt: "$menorAnoNascimento" },
    }
  },
]);
