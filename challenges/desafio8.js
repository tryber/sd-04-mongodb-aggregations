db.air_routes.aggregate([
  { $match: { airplane: { $in: ["747", "380"]}}}, {
    $lookup: {
      from: "air_alliances",
      let: {route_airline: "$airline.name"},
      pipeline: [
        { $unwind: "$airlines"},
        { $match: { $expr: { $eq: ["$airlines", "$$route_airline"]}}}
      ],
      as: "alliances"
    }
  },
  { $unwind: "$alliances"},
  {
    $group: {
      _id: "$alliances.name",
      totalRotas: { $sum: 1}
    }
  },
  { $sort: { totalRotas: -1}},
  { $limit: 1}
]);
