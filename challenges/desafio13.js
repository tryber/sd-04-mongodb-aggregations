/*
Desafio 13
Determine a duração média das viagens iniciadas no dia 10/03/2016, em minutos.
Arredonde o resultado para cima.

O resultado da sua query deve ter o seguinte formato:
  { "duracaoMediaEmMinutos" : <duracao_media_em_minutos> }

   - 1 minuto é igual a 60 000 milissegundos
*/
db.trips.aggregate([
  {
    $match: {
      startTime: { $exists: true },
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00Z"),
        $lte: ISODate("2016-03-10T23:59:59Z"),
      },
    },
  },
  {
    $addFields: {
      deltaTime: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
      },
    },
  },
  {
    $group: {
      _id: null,
      averageDuration: { $avg: "$deltaTime" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$averageDuration" },
    },
  },
]);
