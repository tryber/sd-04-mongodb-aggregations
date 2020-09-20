db.trips.aggregate([
  {
    $match: {
      "usertype": { $in: ["Subscriber", "Customer"] },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [{ $divide: ["$duracaoMedia", 3600 * 1000] }, 2], //um dia tem 360 segundos
      },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
