db.trips.aggregate([
    {
      $addFields: {
        diaDaSemana: { $dayOfWeek: "$startTime" },
        nomeEstacao: "$startStationName"
      },
    },
    {$match: {
        diaDaSemana: {$eq: 5}
    }},

    {
      $group: {
        _id: "$nomeEstacao",
        total: { $sum: 1 },
      },
    },
    {
      $sort: {
        total: -1,
      },
    },
    {
      $project: {
        _id: 0,
        nomeEstacao: "$_id",
        total: "$total",
      },
    },
    { $limit: 1 },
  ]);
  