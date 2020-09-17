// Liste todas as parcerias da coleção air_alliances, que voam rotas com um Boing 747 ou um Airbus A380 (que estão abreviados para 747 e 380 no campo airplane na coleção air_routes, respectivamente), e descubra qual delas tem o maior número de rotas com esses aviões.

db.air_routes.aggregate([
  {
    $match: {
      airplane: { $in: ["747", "380"] },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      let: { airlineName: "$airline.name" },
      pipeline: [
        { $unwind: "$airlines" },
        {
          $match: {
            $expr: {
              $eq: ["$airlines", "$$airlineName"],
            },
          },
        },
        {
          $project: { _id: 0, name: 1 },
        },
      ],
      as: "route",
    },
  },
  {
    $group: {
      _id: "$route.name",
      totalRotas: { $sum: 1 },
    },
  },
  { $unwind: "$_id" },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
