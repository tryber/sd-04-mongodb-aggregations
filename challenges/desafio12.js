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
  },
  {
    $lookup: {
      from: "trips",
      let: {"dia": "$diaDaSemana"},
      pipeline: [
        {
          $match: {
          $expr: {
            $eq: [{$dayOfWeek: "$startTime"}, "$$dia"]
          }
        }},
        {
          $group: {
            "_id": "$startStationName",
            "totalTravels": {$sum: 1}
          }
        },
        {
          $sort: {
            "totalTravels": -1
          }
        },
        {
          $limit: 1
        }
      ],
      as: "estacao"
    }
  },
  {
    $project: {
      nomeEstacao: {$arrayElemAt: ["$estacao._id", 0]},
      total: {$arrayElemAt: ["$estacao.totalTravels", 0]}
    }
  }
]);
