db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { airline: "$airlines", allianceName: "$name" },
      pipeline: [
        {
          $match: {
            airplane: { $in: ["747", "380"] },
            $expr: { $eq: ["$airline.name", "$$airline"] }
          }
        }
      ],
      as: "alianceNames"
    },
  },
  { $unwind: "$alianceNames" },
  { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
  {
    $project: {
      "_id": 1,
      "totalRotas": 1
    }
  },
  {
    $sort: {
      totalRotas: -1
    }
  }
]).pretty();
