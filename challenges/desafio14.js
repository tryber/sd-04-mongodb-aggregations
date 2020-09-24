/*
Desafio 14
Baseado na duração média das viagens, determine quais são as 5 bicicletas que foram mais utilizadas.
Exiba o resultado em minutos arredondados para cima e em ordem decrescente.

O resultado da sua query deve ter o seguinte formato:
  { "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
  { "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
  { "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
  { "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
  { "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
*/
db.trips.aggregate([
  {
    $match: {
      bikeid: { $exists: true },
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
      _id: "$bikeid",
      averageDuration: { $avg: "$deltaTime" },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$averageDuration" },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  { $limit: 5 },
]);
