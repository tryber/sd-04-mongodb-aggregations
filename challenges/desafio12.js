db.trips.aggregate([
  {
    "$group": {
      "_id": {
        "$dayOfWeek": "$startTime"
      },
      "total": {
        "$sum": 1
      }
    }
  }, {
    "$project": {
      "_id": 0,
      "diaDaSemana": "$_id",
      "total": "$total"
    }
  }, {
    "$sort": {
      "total": -1
    }
  }, {
    "$limit": 1
  }, {
    "$lookup": {
      "from": "trips",
      "as": "stations",
      "let": {
        "day": "$diaDaSemana"
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": [
                {
                  "$dayOfWeek": "$startTime"
                }, "$$day"
              ]
            }
          }
        }, {
          "$group": {
            "_id": "$startStationName",
            "total": {
              "$sum": 1
            }
          }
        }, {
          "$sort": {
            "total": -1
          }
        }, {
          "$limit": 1
        }
      ]
    }
  }, {
    "$unwind": {
      "path": "$stations"
    }
  }, {
    "$project": {
      "nomeEstacao": "$stations._id",
      "total": "$stations.total"
    }
  }
]);
