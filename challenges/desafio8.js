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
      as: "infoRotas",
    },
  },
  {
    $project: {
      _id: "$name",
      totalRotas: { $size: "$infoRotas" },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  { $limit: 1 },
]);
