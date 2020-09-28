db.trips.aggregate([
  {
    "$group": {
      "_id": "$bikeid",
      "duracaoMedia": {
        "$avg": {
          "$divide": [
            {
              "$subtract": [
                "$stopTime", "$startTime"
              ]
            }, 1000 * 60
          ]
        }
      }
    }
  }, {
    "$sort": {
      "duracaoMedia": -1
    }
  }, {
    "$limit": 5
  }, {
    "$project": {
      "_id": 0,
      "bikeId": "$_id",
      "duracaoMedia": {
        "$ceil": "$duracaoMedia"
      }
    }
  }
]);
