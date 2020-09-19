db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$diaDaSemana",
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
    $project: {
      diaDaSemana: "$_id",
      total: "$total",
      _id: 0,
    },
  },
  {
    $lookup: {
      from: "trips",
      let: { dds: "$diaDaSemana" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: [{ $dayOfWeek: "$startTime" }, "$$dds"],
            },
          },
        },
        {
          $group: {
            _id: "$startStationName",
            total: { $sum: 1 },
          },
        },
        {
          $sort: {
            total: -1,
          },
        },
        { $limit: 1 },
      ],
      as: "stationData",
    },
  },
  { $unwind: "$stationData" },
  {
    $project: {
      nomeEstacao: "$stationData._id",
      total: "$stationData.total",
    },
  },
]);
