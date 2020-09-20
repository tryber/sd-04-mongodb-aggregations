use('aggregations')
db.trips.find()

use('aggregations')

db.trips.aggregate([

{
    $addFields: {
      day_of_the_week: {"$dayOfWeek": "$startTime"}
    },
  },

  {
    $match: {
      day_of_the_week: 5,
    },
  },
{
    $group: {
      _id: "$endStationName",
      total: {
          $sum: 1
      },
    },
  },
  //   {
  //   $sort: { total: -1, },
  // },
  {
    $project: {
  //     _id: 0,
  day_of_the_week:1,
  //     diaDaSemana: "$_id",
  //     total:1,
    },
  },
  // {
  //   $limit: 1
  // }
]);
  


