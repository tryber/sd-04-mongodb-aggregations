use('aggregations')
db.trips.find()

use('aggregations')

db.trips.aggregate([
  {
    $group: {
      _id: {"$dayOfWeek": "$startTime"},
      count: {
          $sum: 1

        // $avg: {
        //   $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000],
        // },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      count:1
    },
  },
]);
  


