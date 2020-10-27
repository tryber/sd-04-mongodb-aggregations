db.trips.aggregate([
  {
    $group: {

      "total": {$sum: 1},
      "_id": {
        "$dayOfWeek": "$startTime"
      },
    }
  },
  {
    $project: {
      "_id": false,
      "diaDaSemana": "$_id",
      "total": "$total",
    }
  },
  {
    $sort: {
      "total": -1
    }
  },
  {
    $limit: 1
  }
]);
