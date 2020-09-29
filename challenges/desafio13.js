db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00.000Z"),
        $lte: ISODate("2016-03-10T23:59:59.999Z")
      },
    }
  },
  {
    $group: {
      _id: null,
      duracaoMedia: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"]
        }
      }

    }
  },
  {
    $project: {
      _id: 0,
      duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", 60000] }, 2] },
    }
  },
]).pretty();
