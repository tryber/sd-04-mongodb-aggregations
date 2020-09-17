// Desafio 7

db.movies.aggregate([
    {
        $match: {
            cast: {$exists: true},
            languages: "English"
        }
    },
    {
       $unwind: "$cast" 
    },
    {
        $group: {
            _id: "$cast",
            qtyMovies: {$sum: 1},
            media: {$avg: "$imdb.rating"}
        }
    },
    {
        $project: {_id: 1, numeroFilmes: "$qtyMovies", mediaIMDB: {$round: ["$media", 1]}}
    },
    {
        $sort: {numeroFilmes: -1, _id: -1}
    },
]);
