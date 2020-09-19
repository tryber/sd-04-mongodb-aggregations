db.air_alliances.aggregate([
    {$unwind: "$airlines"},
    {$lookup: {
        from: "air_routes",
        let: { nome_compania: "$airlines"},
        pipeline: [
            {$match: {
                airplane: {
                    $in: ["747", "380"]
                },
                $expr: {
                    $eq: ["$airline.name", "$$nome_compania"]
                }
            }}
        ],
        as: "rangelito"
    }},
    {$unwind: "$rangelito"},
    {$group: {
        _id: "$name",
        totalRotas: {$sum: 1}
    }},
    {$sort: {
        totalRotas: -1
    }},
    {$limit: 1}
  ]);
