db.air_alliances.aggregate([
  {$unwind: "$airlines"},
  {$lookup:
    {
      from: "air_routes",
      let: {aliance: "$airlines"},
      pipeline: [
        {
          $match: {airplane: {$in: ["747", "380"]},
          $expr: {$eq: ["$airline.name", "$$aliance"]}}
        }
      ],
      as: "routes"
    }
  },
  {$unwind: "$routes"},
  {$group: {_id: "$name", "totalRotas": {$sum: 1}}},
  {$sort: { "totalRotas": -1 }},
  {$limit: 1}
]);
