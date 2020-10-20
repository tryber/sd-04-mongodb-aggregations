db.trips.aggregate([
  {
    $match: {
      $and: [
        {
          startTime: { $gte: ISODate("2016-03-10") },
        },
      ],
    },
  },
  {
    $addFields: {
      duracaoMediaEmMinutos: {
        $divide: [
          {
            $subtract: ["$stopTime", "$startTime"],
          },
          60000,
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: "$duracaoMediaEmMinutos",
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);

/* Determine a duração média das viagens iniciadas no dia 10/03/2016,
em minutos. Arredonde o resultado para cima.
O resultado da sua query deve ter o seguinte formato:

{ "duracaoMediaEmMinutos" : <duracao_media_em_minutos> } */
