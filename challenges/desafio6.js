// Desafio 6
// REGEX:  \d qualquer digito [0-9], /i não é case sensitive

db.movies.aggregate([
    {
        $match: {
            awards: {$regex: /won \d oscar/i} 
        }
    },
    {
        $group: {
            maior_rating: {$max: "$imdb.rating"},
            menor_rating: {$min: "$imdb.rating"},
            media_rating: {$avg: "$imdb.rating"},
            desvio_padrao: {$stdDevSamp: "$imdb.rating"},
            _id: "title"
        }
    },
    {
        $project: {
            _id: 0,
            maior_rating: 1,
            menor_rating: 1,
            media_rating: {$round: ["$media_rating", 1]},
            desvio_padrao: {$round: ["$desvio_padrao", 1]}
        }
    }
]);