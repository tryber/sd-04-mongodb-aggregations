db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      let: { companies: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $in: ["$airline.name", "$$companies"] },
                { $in: ["$airplane", ["747", "380"]] },
              ],
            },
          },
        },
      ],
      as: "Rotas_747_380",
    },
  },
  {
    $project: {
      _id: "$name",
      totalRotas: { $size: "$Rotas_747_380" },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  { $limit: 1 },
]);
