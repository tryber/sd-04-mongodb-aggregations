const miliSecToMinuteFactor = 1000 * 60;

db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00Z"),
        $lte: ISODate("2016-03-10T23:59:59Z"),
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: {
          $divide: ["$duracaoMediaEmMinutos", miliSecToMinuteFactor],
        },
      },
    },
  },
]);
