db.air_routes.aggregate([
  { $match: { airplane: { $in: ["747", "380"] } } },
  {
    $lookup: {
      from: "air_alliances",
      let: { airlineName: "$airline.name" },
      pipeline: [
        { $unwind: "$airlines" },
        {
          $match: {
            $expr: { $eq: ["$airlines", "$$airlineName"] }
          }
        }
      ],
      as: "alliance"
    }
  },
  { $unwind: "$alliance" },
  {
    $group: {
      _id: "$alliance.name",
      totalRotas: { $sum: 1 }
    }
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 }
]);
