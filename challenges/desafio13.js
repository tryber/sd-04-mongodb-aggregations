db.trips.aggregate([
    {
        $project: {_id: 0,  "data": {$dateToParts: { "date": "$startTime" }}, "startTime": 1, "stopTime": 1}
    },
    {
        $match: {
            $and: [{"data.year": 2016}, {"data.month": 3}, {"data.day": 10}]
        }
    },
    // {
    //     $project: {_id: 0,"startStationName": 1,  "dataJoin": {$dateFromParts: { 
    //         'year': "$data.year", 'month': "$data.month", 'day': "$data.day",
    //         'hour': "$data.hour", 'minute': "$data.minute", 'second': "$data.second",
    //         'millisecond': "$data.millisecond"
    //     }}}
    // },
    {
        $group: {
            _id: "$data.year",
            "duracaoMediaEmMinutos": {$avg: {$divide: [{$subtract: ["$stopTime", "$startTime"]}, 60000]}}
        }
    },
    {$project: { _id:0, "duracaoMediaEmMinutos": {$ceil: "$duracaoMediaEmMinutos"}}}
]);
