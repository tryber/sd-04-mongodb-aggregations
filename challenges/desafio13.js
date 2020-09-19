const milisecToMinute = 60 * 1000;

db.trips.aggregate([
  { $match: {
    $expr: {
      $and: [
        {$gte: ["$startTime", ISODate("03/10/2016") ]},
        {$lt: ["$startTime", ISODate("03/11/2016") ]},
      ]
    }
  },
},
{$group: {
  _id: null,
  media: {$avg: {$divide:[{$subtract: ["$stopTime", "$startTime"]}, milisecToMinute]}}
}},
{
$project: {
  _id: 0,
  duracaoMediaEmMinutos: {$ceil: "$media"}
}}
]);
