db.trips.aggregate([
  {
    $match: {
      startTime: { $gt: ISODate("2016-03-09"), $lt: ISODate("2016-03-11") },
    },
  },
  {
    $group: {
      _id: "null",
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
          //  60 (s) * 1000 (ms) === 60000
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $round: ["$duracaoMediaEmMinutos", 0] },
    },
  },
]);
