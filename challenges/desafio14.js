db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      media: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000]
        }
      }
    }
  },
  { $sort: { media: -1 } },
  { $limit: 5 },
  { $project: { _id: 0, bikeId: "$_id", duracaoMedia: { $ceil: "$media" } } }
]);
