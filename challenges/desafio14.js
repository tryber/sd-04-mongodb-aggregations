db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [
            {
              $subtract: ["$stopTime", "$startTime"]
            },
            6e+4
          ]
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: "$duracaoMediaEmMinutos"
      }
    }
  },
  {
    $sort: {
      duracaoMedia: -1
    }
  },
  {
    $limit: 5
  }
]).pretty();
