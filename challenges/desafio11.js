  
db.trips.aggregate([
  {$addFields: { dayOfweek: { $dayOfWeek: "$startTime" } }},
  {$group: {_id: "$dayOfweek", total: { $sum: 1 }}},
  {$project: {_id: 0, diaDaSemana: "$_id", total: "$total"}},
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

// $dayOfWeek => Retorna o dia da semana para uma data como um número entre 1 (domingo) e 7 (sábado).
