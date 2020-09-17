db.trips.aggregate([
  { $group: { _id: { $dayOfWeek: "$startTime" }, count: { $sum: 1 } } },
  { $project: { _id: 0, diaDaSemana: "$_id", total: "$count" } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
