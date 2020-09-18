db.movies.aggregate([
  {$match: {languages: "English"}},
  {$unwind: "$cast"},
  {$group:{
    _id: "$cast",
    numeroFilmes: {$count:"$cast"},
    mediaIMDB: {$avg: "$imdb.rating"}
  }},
  {$project: {_id:1, numeroFilmes: 1, mediaIMDB:{$round: ["$mediaIMDB",1]}}}
]);
