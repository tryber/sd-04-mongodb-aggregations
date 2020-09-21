db.air_alliances.find({}).pretty()
db.air_alliances.aggregate([
  {$lookup}
]);
