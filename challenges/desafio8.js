db.air_alliances.aggregate([
  {
    //  separando nomes das companhias na array
    $unwind: "$airlines"
  },
  {
    $lookup: {
      from: "air_routes",
      let: { companyName: "$airlines" },
      pipeline: [
        {
          $match: {
            airplane: { $in: ["747", "380"] },
            $expr: {
              $eq: ["$airline.name", "$$companyName"]
            }
          }
        }
      ],
      as: "routes"
    }
  },
  {
    //  separando routes
    $unwind: "$routes"
  },
  {
    $group: {
      //  agrupa pelo nome da alliance
      _id: "$name",
      //  soma as rotas
      totalRotas: { $sum: 1 }
    }
  },
  {
    $sort: {
      totalRotas: -1
    }
  },
  {
    $limit: 1
  }
]);
