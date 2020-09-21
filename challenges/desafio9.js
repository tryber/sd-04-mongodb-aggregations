db.trips.aggregate([
  {$match: {birthYear: {$exists: 1}, birthYear: {$ne : ""}}},
  {$project: {
    birthYear: {$toInt : "$birthYear"}
  }},
  {$group: {
  _id: null,
  maiorAnoNascimento: {$max: "$birthYear"},
  menorAnoNascimento: {$min: "$birthYear"},
}},
{$project: {
  _id:0,
  maiorAnoNascimento: 1,
  menorAnoNascimento: 1
}}
]);
