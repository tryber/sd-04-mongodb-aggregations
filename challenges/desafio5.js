// Atores ou atrizes preferidos:

//     Sandra Bullock
//     Tom Hanks
//     Julia Roberts
//     Kevin Spacey
//     George Clooney

// Para filmes lançados nos Estados Unidos (campo countries), com tomatoes.viewer.rating maior ou igual a 3, crie um novo campo chamado num_favs, que represente quantos atores ou atrizes da nossa lista de favoritos aparecem no elenco (campo cast) do filme.

// Ordene os resultados por num_favs, tomatoes.viewer.rating e title, todos em ordem decrescente.

// Por fim, utilizando o mesmo pipeline, responda: Qual o título do vigésimo quinto filme do resultado dessa agregação?

db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $exists: 1 },
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: [
            "$cast",
            [
              "Sandra Bullock",
              "Tom Hanks",
              "Julia Roberts",
              "Kevin Spacey",
              "George Clooney",
            ],
          ],
        },
      },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  { $project: { _id: 0, title: 1 } },
  { $skip: 24 },
  { $limit: 1 },
]);
