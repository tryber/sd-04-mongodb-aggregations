db.trips.aggregate([
  {
    $project: {
      _id: 0,
      "diaDaSemana": { $dayOfWeek: "$startTime" },
      "nomeEstacao": "$startStationName"
    }
  },
  {
    $match: {
      "diaDaSemana": 5
    }
  },
  {
    $group: {
      _id: "$nomeEstacao",
      "total": { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      "nomeEstacao": "$_id",
      "total": "$total"
    }
  },
  {
    $sort: { total: -1 }
  },
  {
    $limit: 1
  }
]);
