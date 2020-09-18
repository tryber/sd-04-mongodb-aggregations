// Desafio 8

// Querys para consulta
// db.air_airlines.find().limit(1)
// db.air_alliances.find().limit(1)
// db.air_routes.find().limit(1)

db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { airCompany: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$airline.name", "$$airCompany"] },
            airplane: { $in: ["747", "380"] },
          },
        },
      ],
      as: "rotas",
    },
  }, // Precisa separar os que possui rotas em array
  {
    $unwind: "$rotas",
  },
  {
    // agrupar pelo nome da companhia, de acordo com o requisito
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 1,
      totalRotas: 1,
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },
]);
