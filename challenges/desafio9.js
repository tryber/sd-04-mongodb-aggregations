db.trips.aggregate([
  {
    $match: {
      birthYear: {
        $exists: true,
        $ne: ""
      }
    }
  },
  {
    $group: {
      "_id": 1,
      "maiorAnoNascimento" : {
        $max: {
          $toInt: "$birthYear"
        }
      },
      "menorAnoNascimento": {
        $min: {
          $toInt: "$birthYear"
        }
      }
    }
  },
  {
    $project: {
      "maiorAnoNascimento": true,
      "menorAnoNascimento": true,
      "_id": false
    }
  }
]);
