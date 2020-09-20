db.trips.aggregate([
  {
    $addFields: {
      day_of_the_week: { $dayOfWeek: "$startTime" },
    },
  },

  {
    $match: {
      day_of_the_week: 5,
    },
  },
  {
    $group: {
      _id: {
        id: "$startStationId",
        name: "$startStationName",
      },
      total: {
        $sum: 1,
      },
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $project: {
      _id: 0,
      day_of_the_week: 1,
      nomeEstacao: "$_id.name",
      total: "$total",
    },
  },
  {
    $limit: 1,
  },
]);
