// Referência retirada do link: https://stackoverflow.com/questions/60705034/mongodb-how-to-query-for-strings-which-doesnt-have-any-spaces-omit-the-strin
// VALEU YOSHI PELA MÃO, MEU LINDO <3

db.movies.aggregate([
  //filtra
  { $match: { $expr: { $lt: [{ $size: { $split: ["$title", " "] } }, 2] } } },
  //projeta
  {
    $project: {
      _id: 0,
      title_split: ["$title"],
    },
  },
  //ordena
  { $sort: { title_split: 1 } },
]);
