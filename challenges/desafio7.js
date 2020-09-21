db.movies.aggregate([
  {$match: {languages: {$all: ["English"]}}},
  {$unwind: "$cast"},
  {$group: { _id: "$cast", numFilmes: {$sum: 1}, mediaIMDB: { $avg: "$imdb.rating"}}},
  {$project: { numeroFilmes: "$numFilmes", mediaIMDB: {$round: ["$mediaIMDB", 1]}}},
  {$sort: {numeroFilmes: -1, _id: -1}}
]);
