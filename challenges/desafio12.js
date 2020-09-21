db.trips.aggregate([
  {
    $match: { startStationName: "Pershing Square North" },
  },
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      nomeEstacao: { $first: "$startStationName" },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      nomeEstacao: 1,
      total: 1,
      _id: 0,
    },
  },
  {
    $sort: { total: -1 },
  },
  { $limit: 1 },
]);
