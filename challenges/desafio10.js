// Encontre a média de viagens por tipo de usuário. Exiba o valor em horas com apenas duas casas decimais.
db.trips.aggregate([
  {
    // add campo "total" com a subtração dos tempos;
    $addFields: {
      total: {
        $abs: {
          $subtract: ["$startTime", "$stopTime"],
        },
      },
    },
  },
  {
    // Agrupa: users pelo "usertype", cria campo duração media,
    // com a media do campo "total"
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$total" },
    },
  },
  {
    // projeta tipo por "_id" e duracaoMedia com result
    // da operação.
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [
          {
            $divide: ["$duracaoMedia", 3600000],
          },
          2,
        ],
      },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
