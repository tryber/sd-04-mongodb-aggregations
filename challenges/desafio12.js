db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      nomeEstacao: { $push: "$startStationName" },
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $unwind: "$nomeEstacao" },
  {
    $group: {
      _id: "$nomeEstacao",
      count: { $sum: 1 },
      total: { $first: "$total" }
    }
  },
  { $sort: { count: -1 } },
  { $limit: 1 },
  { $project: { _id: 0, nomeEstacao: "$_id", total: "$total" } }
]);
