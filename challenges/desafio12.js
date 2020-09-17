db.trips.aggregate([
  { $match: { $expr: { $eq: [{ $dayOfWeek: "$startTime" }, 5] } } },
  { $group: { _id: "$startStationName", count: { $sum: 1 } } },
  { $project: { _id: 0, nomeEstacao: "$_id", total: "$count" } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
