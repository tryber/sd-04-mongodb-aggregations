db.air_alliances.aggregate([
  {
    //  extraindo nomes das companhias da array
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
    //  separando por routes
    $unwind: "$routes"
  },
  {
    $group: {
      //  agrupa pelo nome da companhia
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
