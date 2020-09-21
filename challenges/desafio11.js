db.trips.aggregate([
  {
    $match: {
      startTime: { $exists: true },
    },
  },
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      total: { $sum: 1 },
    },
  },
  {
    $sort: { _id: 1 },
  },
  { $skip: 4 },
  { $limit: 1 },
  {
    $project: {
      diaDaSemana: "$_id",
      total: 1,
      _id: 0,
    },
  },
]);
