db.movies.find(
    {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
    },
    { _id: false, title: true, genres: true, rated: true, languages: true }
  );

// db.movies.aggregate([
//   {
//     $match: {
//       "imdb.rating": { $gte: 7 },
//       genres: { $nin: ["Crime", "Horror"] },
//       rated: { $in: ["PG", "G"] },
//       languages: {
//         $all: ["English", "Spanish"],
//       },
//     },
//   },