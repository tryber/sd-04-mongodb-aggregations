db.trips.aggregate([
  { $match: {
    $expr: {
      $eq: [5, { $dayOfWeek: "$startTime" }]
    }
  } },
  { $group: {
    _id: "$startStationName",
    total: { $sum: 1 }
  } },
  { $project: {
    _id: 0,
    nomeEstacao: "$_id",
    total: "$total"
  } },
  { $sort: { total: -1 } },
  { $limit: 1 }
]);
