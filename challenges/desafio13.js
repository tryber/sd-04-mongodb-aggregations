db.trips.aggregate([
  {
    "$match": {
      "startTime": {
        "$gte": new Date("Thu, 10 Mar 2016 00:00:00 GMT"),
        "$lt": new Date("Fri, 11 Mar 2016 00:00:00 GMT")
      }
    }
  }, {
    "$group": {
      "_id": null,
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
    "$project": {
      "_id": 0,
      "duracaoMediaEmMinutos": {
        "$ceil": "$duracaoMedia"
      }
    }
  }
]);
