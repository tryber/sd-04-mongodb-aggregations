db.trips.aggregate([
    {
        $match: {
            $and: [{"birthYear": {$exists: true}},{"birthYear": {$ne: ""}}],
        }
    },
    {$group:
    {
        _id: "birthYear",
        "maiorAnoNascimento": {$max: {$toInt: "$birthYear"}},
        "menorAnoNascimento": {$min: {$toInt: "$birthYear"}},
    }
    },
    {$project: {_id: 0}}
]);