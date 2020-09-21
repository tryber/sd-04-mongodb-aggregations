db.movies.aggregate([
  {$sort: {title: 1}},
  {$addFields: {
    title_split: {$split: ["$title", " "]}
  }},
  {$match: {title_split: {$size: 1}}},
  {$project: {_id: 0, title_split: 1}}
]);
