db.trips.aggregate([
  {
    $group: {
      _id: {
        convertDayOfWeek: { $dayOfWeek: "$startTime" },
        nomeEstacao: "$startStationName",
      },
      total: { $sum: 1 },
    },
  },
  {
    $match: { "_id.convertDayOfWeek": 5 },
  },
  {
    $sort: { total: -1 },
  },
  {
    $project: {
      _id: false,
      nomeEstacao: "$_id.nomeEstacao",
      total: "$total",
    },
  },
  { $limit: 1 },
]);
