db.trips.aggregate([
  {
    $match: {
      birthYear: {
        $exists: true,
        $ne: "",
      }
    }
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: {
        $max: { $toInt: "$birthYear" }
      },
      menorAnoNascimeto: {
        $min: { $toInt: "$birthYear" }
      }
    }
  }
]);
