db.trips.aggregate([
  {
    $addFields: {
      duracaoMedia: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$duracaoMedia" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  {
    $sort: {
      tipo: -1,
    },
  },
]);

// 4 - Divide o resultado da diferença entren stopTime e startTime por 3600000
/* Encontre a média de viagens por tipo de usuário. Exiba o valor em horas
com apenas duas casas decimais e a média de viagens ordenada de forma
crescente. Para arredondar a média use o $round.
O resultado da sua query deve ter o seguinte formato:
{ "tipo" : <tipo>, "duracaoMedia" : <duracaoMedia> }
// ... */
