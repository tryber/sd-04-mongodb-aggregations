// DESAFIO 13
// Determine a duração média das viagens iniciadas no dia 10/03/2016, em minutos. Arredonde o resultado para cima.

// O resultado da sua query deve ter o seguinte formato:

// { "duracaoMediaEmMinutos" : <duracao_media_em_minutos> }

db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gt: ISODate("2016-03-10"),
        $lt: ISODate("2016-03-11"),
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
  { $sort: { duracaoMediaEmMinutos: 1 } },
]);
