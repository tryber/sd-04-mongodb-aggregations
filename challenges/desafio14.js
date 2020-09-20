db.trips.aggregate([
  {
    $addFields: {
      duracaoMediaEmMinutos: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMediaEmMinutos: { $avg: "$duracaoMediaEmMinutos" },
    },
  },
  {
    $sort: {
      duracaoMediaEmMinutos: -1,
    },
  },
  {
    $project: {
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMediaEmMinutos" },
      _id: 0,
    },
  },
  { $limit: 5 },
]);
