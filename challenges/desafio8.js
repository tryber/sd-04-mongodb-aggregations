db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $match: { name: "SkyTeam" },
  },
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "rotas",
    },
  },
  {
    $unwind: "$rotas",
  },
  {
    $match: {
      "rotas.airplane": { $in: ["747", "380"] },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $project: {
      qtdRotas: 1,
      totalRotas: 1,
    },
  },
]);
