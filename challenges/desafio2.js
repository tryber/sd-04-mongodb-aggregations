db.movies.aggregate([{
    $match: {
        "imdb.rating": { $gt: 7 }, as: "notaIMDB",
        "genres": { $nin: ["Crime", "Horror"] },
        "rated": { $in: ["PG", "G"] },
        "languages": { $in: ["English", "Spanish"] }
    }
}]);
