db.air_alliances.aggregate([
  {
    $unwind: "$airlines"
  },
  {
    $lookup: {
      from: "air_routes",
      let: { nameLine: "$airlines" },
      pipeline: [
        {
          $match: {
            "airplane": { $in: ["747", "380"]},
            $expr: {
              $eq: ["$airline.name", "$$nameLine"]
            }
          }
        }
      ],
      as: "routes"
    }
  },
  {
    $unwind: "$routes"
  },
  {
    $group: {
      "_id": "$name",
      "totalRotas": { $sum: 1 }
    }
  },
  {
    $sort: { "totalRotas": -1 }
  },
  {
    $limit: 1
  }
]);
