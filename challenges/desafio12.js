db.trips.aggregate([
      {
        $group: {

          _id: {
            nomeEstacao: "$startStationName",
            diaDaSemana: { $dayOfWeek: "$startTime" }
          },
          total: {
            $sum: 1
          }
        }
      },
      {
        $match: { "_id.diaDaSemana": 5 }
      },
      {
        $project: {
          _id: 0,
          nomeEstacao: "$_id.nomeEstacao",
          total: "$total"
        }
      },
      {
        $sort: { total: -1 }
      },
      { $limit: 1 }
    ]).pretty();
