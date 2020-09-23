db.movies.aggregate([
  {$match:{"imdb.rating":{$gte:7},
  "genres":{$nin:["Crime","Horror"]},
  $or:[{"rated":"PG"},{"rated":"G"}],
  $and:[{languages:"English"},{languages:"Spanish"}]}},
  {$project:{
    _id:0,
    titulo:"$title",
    avaliado:"$rated",
    notaIMDB:"$imdb.rating",
    votosIMDB:"$imdb.votes",
    ano:"$year"
  }},
  {
    $sort:{"ano":-1,"notaIMBD":-1,"titulo":1}
  }
]);
/*Desafio 3
Agora que você tem os campos essenciais, retorne esses filmes ordenados 
por ano e nota IMDB de forma decrescente e o título por ordem alfabética (nesta ordem de desempate).
 */