db.trips.aggregate([
  {
    $match: {
      "startTime": {
        $gte: ISODate("2016-03-10"),
        $lt: ISODate("2016-03-11")      }
    }
  },
  {
    $group: {
      "_id": 1,
      "duracaoMediaEmMinutos": {
        $avg: {
          $floor: {
            $divide: [{
              $subtract: ["$stopTime", "$startTime"]
            }, 60000]
          }
        }
      }
    }
  },
  {
    $project: {
      "duracaoMediaEmMinutos": {$ceil: "$duracaoMediaEmMinutos"},
      "_id": false
    }
  }
]);