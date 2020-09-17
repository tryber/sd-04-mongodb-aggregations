db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          //  msec * 1000 => sec * 60 => min * 60 => hour
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 60 * 1000]
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] }
    }
  },
  {
    $sort: {
      duracaoMedia: 1
    }
  }
]);
