db.trips.aggregate([
  {
    $addFields: {
      duracaoMedia: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$duracaoMedia" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  {
    $sort: {
      tipo: -1,
    },
  },
]);
