db.trips.aggregate([
  { $match: {
    $expr: {
      $and: [
        {$gte: ["$startTime", ISODate("2016-03-10T00:00:00Z") ]},
        {$lt: ["$startTime", ISODate("2016-03-10T23:59:59Z") ]},
      ]
    }
  },
},
{$group: {
  _id: null,
  media: {$avg: {$divide:[{$subtract: ["$stopTime", "$startTime"]}, 60000]}}
}},
{
$project: {
  _id: 0,
  duracaoMediaEmMinutos: {$ceil: "$media"}
}}
]);
