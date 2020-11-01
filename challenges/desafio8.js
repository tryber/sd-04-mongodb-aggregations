db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { companys: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$airline.name", "$$companys"] },
            airplane: { $in: ["747", "380"] },
          },
        },
      ],
      as: "companysFound",
    },
  },
  { $unwind: "$companysFound" },
  { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
  { $sort: {totalRotas: -1} },
  { $limit: 1 },
]);
