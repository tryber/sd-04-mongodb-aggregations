db.trips.aggregate([
  {
    $match: {
      "startTime": {
        $gte: ISODate("2016-03-10")
      }
    }
  },
  {
    $addFields: {
      "duracaoMediaEmMinutos": {
        $subtract: [ "$stopTime", "$startTime" ]
      }
    }
  },
  {
    $group: {
      "_id": null,
      "duracaoMediaEmMinutos": {
        $avg: "$duracaoMediaEmMinutos"
      }
    }
  },
  {
    $project: {
      "_id": 0,
      "duracaoMediaEmMinutos": {
        $ceil: {
          $divide: [ "$duracaoMediaEmMinutos", 60000 ]
        }
      }
    }
  }
]);
