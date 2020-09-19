db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: { $subtract: ["$startTime", "$stopTime"] }
      }
    }
  },
  {
    $sort: {
      duracaoMedia: -1
    }
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", 3600000 ]}, 2]}
    }
  }
]);
