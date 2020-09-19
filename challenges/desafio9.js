db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: 1 },
      birthYear: { $ne: "" },
    },
  },
  {
    $addFields: { inteiro: { $toInt: "$birthYear" } },
  },
  {
    $group: {
      _id: "",
      maiorAnoNascimento: { $max: "$inteiro" },
      menorAnoNascimento: { $min: "$inteiro" },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);
