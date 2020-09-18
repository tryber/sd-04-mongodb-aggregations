db.movies.aggregate([
    {$unwind: "$cast"},
    {
        $match: {"languages": "English" }
    },
    {
        $group: {
            _id: "$cast",
            "mediaIMDB": {$avg: "$imdb.rating"},
            "numeroFilmes": {$sum: 1},
        }
    },
    {$sort: { "numeroFilmes": -1,"_id": -1}},
    {$project: {_id:1, "numeroFilmes":1, "title": 1, "mediaIMDB": {$round: ["$mediaIMDB", 1]} }}
]);
