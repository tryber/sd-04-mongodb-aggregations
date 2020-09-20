use("aggregations");
db.trips.find();

use("aggregations");

db.trips.aggregate([
  {
    $match: {
      startIme: {
        $gte: ISODate("2016-03-10T00:00:00.000Z"),
        $lte: ISODate("2016-03-10T00:23:59.000Z"),
      },
    },
  },
]);
