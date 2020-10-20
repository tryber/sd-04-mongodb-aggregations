db.movies.aggregate([
{$match: {"imdb.rating": {$gte: 7}}},
{$match: {$and: [{"genres": {$ne: "Crime"}}, {"genres": {$ne: "Horror"}}]}},
{$match: {$or: [{"rated": "PG"}, {"rated": "G"}]}},
{$match: {$and: [{"languages": "English"}, {"languages": "Spanish"}]}}]);
