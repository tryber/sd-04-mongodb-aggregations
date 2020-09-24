db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      diaDaSemana: { $first: { $dayOfWeek: "$startTime" } },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: 1,
      total: 1,
    },
  },
  {
    $sort: { total: -1 },
  },
  { $limit: 1 },
]);
