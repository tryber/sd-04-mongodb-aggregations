db.trips.aggregate([
  {
    $match: {
      $expr: {
        $eq: [
          {$dayOfWeek: "$startTime"},
          5
        ]
      }
    }
  }, {
    $group: {
      _id: "$endStationName",
      soma: {
        $sum: 1
      }
    }
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$soma",
    }
  },
  {
    $sort: {
      total: -1
    }
  },
  {
    $limit: 1
  }
]).pretty();
