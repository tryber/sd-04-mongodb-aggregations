db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      avgTravelTime: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000],
        },
      },
    },
  },
  {
    $project: {
      _id: false,
      tipo: "$_id",
      duracaoMedia: { $round: ["$avgTravelTime", 2] },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  }
]);
