// Encontre a média de viagens por tipo de usuário. Exiba o valor em horas com apenas duas casas
// decimais e a média de viagens ordenada de forma crescente. Para arredondar a média use o $round.
db.trips.aggregate([
  {$group: {_id: "$usertype", duracaoMedia: {$avg: {$subtract: ["$stopTime", "$startTime" ]}}}},
  {$project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: {$round: [{$divide: ["$duracaoMedia", 1000*60*60]}, 2]}}},
    {$sort: {duracaoMedia: 1}},
]);
