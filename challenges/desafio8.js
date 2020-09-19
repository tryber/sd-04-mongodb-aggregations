db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    let: { airlineCompany: "$airlines" },
    pipeline: [
      { $match: {
        airplane: { $in: ["747", "380"] },
        $expr: {
          $and: [
            { $eq: [ "$airline.name", "$$airlineCompany" ] },
          ]
        }
      } }
    ],
    as: "airline_route"
  } },
  { $unwind: "$airline_route" },
  { $group: {
    _id: "$name",
    totalRotas: { $sum: 1 }
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 }
]);
