db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: true },
      birthYear: { $nin: [""] }
    }
  },
  {
    $group: {
      _id: 1,
      maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
      menorAnoNascimento: { $min: { $toInt: "$birthYear" } }
    }
  },
  {
    $project: {
      _id: 0
    }
  }
]);
