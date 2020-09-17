db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"]}}
    }
  },
  { $project: { tipo: "$_id", _id: 0, duracaoMedia: { $round: [ {$divide: ["$duracaoMedia", 60*60*1000]}, 2]}}},
  { $sort: { duracaoMedia: 1}}
]).pretty();
