db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: ISODate("2016-03-10") }
    }
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [
            { $subtract: ["$stopTime", "$starTime"] },
            60000
          ]
        }
      }
    }
  },
  { $project: { duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" }, _id: 0 } }
]);
