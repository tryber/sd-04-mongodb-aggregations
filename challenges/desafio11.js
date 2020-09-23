// Determine qual o dia da semana com maior número de viagens iniciadas.

db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$diaDaSemana",
      count: { $sum: 1 },
    },
  },
  {
    $sort: { count: -1 },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$count",
    },
  },
]);
