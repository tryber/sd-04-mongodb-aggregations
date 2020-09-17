db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: true },
      birthYear: { $nin: [""] }
    }
  },
  {
    $group: {
      _id: null,
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
