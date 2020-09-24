/*
Desafio 10
Encontre a média de viagens por tipo de usuário. Exiba o valor em horas com apenas duas casas decimais
e a média de viagens ordenada de forma crescente. Para arredondar a média use o $round.

O resultado da sua query deve ter o seguinte formato:
  { "tipo" : <tipo>, "duracaoMedia" : <duracaoMedia> }

  - 1 hora é igual a 3 600 000 milissegundos
*/
db.trips.aggregate([
  {
    $match: {
      usertype: { $exists: true },
    },
  },
  {
    $addFields: {
      deltaTime: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      averageDuration: { $avg: "$deltaTime" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$averageDuration", 2] },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
