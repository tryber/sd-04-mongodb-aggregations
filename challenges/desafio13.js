// Determine a duração média das viagens iniciadas no dia 10/03/2016, em minutos. Arredonde o resultado para cima.

db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10"),
      },
    },
  },
  {
    $group: {
      _id: null,
      duracao: {
        $avg: {
          $divide: [
            {
              $subtract: ["$stopTime", "$startTime"],
            },
            60000,
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracao" },
    },
  },
]);
