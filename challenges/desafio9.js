db.trips.aggregate([
  //filtra
  {
    $match: {
      $and: [{ birthYear: { $exists: 1 }, birthYear: { $nin: [""] } }],
    },
  },
  //group para max/min
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
      menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
    },
  },
  //projeta
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    },
  },
]);
