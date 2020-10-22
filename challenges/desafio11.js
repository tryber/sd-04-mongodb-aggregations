db.trips.aggregate([
  {
    $group: {
      "_id": {
        "$dayOfWeek": "$startTime"
      },
      "total": {$sum: 1}
    }
  },
  {
    $project: {
      "diaDaSemana": "$_id",
      "total": true,
      "_id": false
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
