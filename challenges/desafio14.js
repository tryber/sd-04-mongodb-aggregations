db.trips.aggregate([
  {
    $addFields: {
      duraçao: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: "$bikeid",

      avg: { $avg: "$duraçao" },
    },
  },

  {
    $sort: { avg: -1 },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      // duracaoMedia: { $round: [{ $divide: ["$avg", 60000] }, 0] },
      duracaoMedia: { $ceil: { $divide: ["$avg", 60000] } },
    },
  },
]);
