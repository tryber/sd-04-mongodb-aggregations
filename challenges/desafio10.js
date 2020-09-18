// referência do link: https://www.tutorialspoint.com/how-to-calculate-timestamp-difference-in-hours-with-mongodb

db.trips.aggregate([
  //group para max/min
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000],
        },
      },
    },
  },
  //projeta
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  //ordena
  { $sort: { duracaoMedia: 1 } },
]);
