db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { alliance_airlines: "$airlines" },
      pipeline: [
        {
          $match: {
            $and: [
              { airplane: { $in: ["747", "380"] } },
              { $expr: { $eq: ["$airline.name", "$$alliance_airlines"] } },
              // {
              //   $expr: {
              //     $or: [
              //       { $eq: ["$airline.name", "$$alliance_airlines"] },
              //       { $eq: ["$airline.iata", "$$alliance_airlines"] },
              //     ],
              //   },
              // },
            ],
          },
        },
      ],
      as: "rotas",
    },
  },
  { $match: { $expr: { $gt: [{ $size: "$rotas" }, 0] } } },
  { $group: { _id: "$name", count: { $sum: { $size: "$rotas" } } } },
  { $project: { _id: 1, totalRotas: "$count" } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
