db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      averageTimeTripMs: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
        },
      },
    },
  },
  {
    $sort: { averageTimeTripMs: -1 },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: { $divide: ["$averageTimeTripMs", 1000 * 60] } },
    },
  },
]);
