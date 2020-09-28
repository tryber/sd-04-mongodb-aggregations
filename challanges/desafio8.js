db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { company: "$airlines" },
      pipeline: [
        {
          $match: {
            airplane: { $in: ["747", "380"] },
            $expr: {
              $eq: ["$airline.name", "$$company"],
            },
          },
        }
      ],
      as: "routes",
    },
  },
  {
    $unwind: "$routes",
  },
  {
    $group: {
      _id: "$name",
      totalRoutes: { $sum: 1 },
    },
  },
  {
    $sort: {
      totalRoutes: -1,
    },
  },
  {
    $limit: 1,
  }
]);
