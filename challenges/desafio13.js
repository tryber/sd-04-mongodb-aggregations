db.trips.aggregate([
  {
    $addFields: {
      duraçao: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00.000Z"),
        $lte: ISODate("2016-03-10T23:59:59.000Z"),
      },
    },
  },

  {
    $group: {
      _id: null,

      avg: { $avg: "$duraçao" },
    },
  },
  {
    $project: {
      _id: 0,

      duracaoMediaEmMinutos: { $round: [{ $divide: ["$avg", 60000] }, 0] },
    },
  },
]);
