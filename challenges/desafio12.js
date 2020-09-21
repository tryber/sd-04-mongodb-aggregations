db.trips.aggregate([
  {$addFields: {
    diaDaSemana: {$dayOfWeek: "$startTime"}
  }},
  {$group: {
    _id: {diaSemana:"$diaDaSemana", station:"$startStationName"},
    total: {$sum: 1},
  }},
  {$match: {"_id.diaDaSemana": 5}},
  {$project:{
    nomeEstacao: "$station",
    total:"$total",
    _id:0
  }},
  {$sort: {total: -1}},
  {$limit: 1}
]);
