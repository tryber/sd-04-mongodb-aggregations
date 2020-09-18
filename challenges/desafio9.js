
db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: 1 },
      birthYear: { $ne: "" },
    },
  },
  {
    $addFields: {
      convertedBirth: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$newYear" },
      menorAnoNascimento: { $min: "$newYear" },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);
