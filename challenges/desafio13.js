db.trips.aggregate([
  {
    $match: {
      $and: [
        { startTime: { $gte: ISODate("2016-03-10") } },
        { startTime: { $lt: ISODate("2016-03-11") } },
      ],
    },
  },
  {
    $addFields: {
      duracaoMediaEmMinutos: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: { $avg: "$duracaoMediaEmMinutos" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);
