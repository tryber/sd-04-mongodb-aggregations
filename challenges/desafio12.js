db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      total: { $sum: 1 },
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $lookup: {
      from: "trips",
      let: { dayOfWeek: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: [{ $dayOfWeek: "$startTime" }, "$$dayOfWeek"] },
          },
        },
        {
          $group: {
            _id: "$startStationName",
            totalTravels: { $sum: 1 },
          },
        },
        {
          $sort: {
            totalTravels: -1,
          },
        },
        {
          $limit: 1,
        }
      ],
      as: "popularStation",
    },
  },
  {
      $project: {
          _id: false,
          nomeEstacao: {$first: "$popularStation._id"},
          total: {$first: "$popularStation.totalTravels"}
      }
  }
]);
