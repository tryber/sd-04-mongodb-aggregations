db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: new ISODate("2016-03-10T00:00:00.000Z") },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracaoMedia", 60000] } },
    },
  },
]);
