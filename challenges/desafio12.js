db.trips.aggregate([
  {
    $match: {
      $expr: {
        $eq: [5, { $dayOfWeek: "$startTime" }]
      }
    }
  },
  {
    $group: {
      _id: {
        id: "$startStationId",
        name: "$startStationName"
      },
      total: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.name",
      total: "$total"
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
]);
