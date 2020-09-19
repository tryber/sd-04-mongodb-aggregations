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
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
  { $limit: 5 },
]);
