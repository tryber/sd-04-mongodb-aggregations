db.trips.aggregate([
  {
    $match: {
      //  pega todos os horários do dia 10/03/2016
      startTime: {
        $gte: ISODate("2016-03-10"),
        $lt: ISODate("2016-03-11")
      }
    }
  },
  {
    $group: {
      _id: "groupId",
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000]
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" }
    }
  }
]);
