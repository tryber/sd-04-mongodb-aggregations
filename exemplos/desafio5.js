db.produtos.updateMany({$and:[{"nome": {$nin: ["McChicken"]}}, {"ingredientes": {$nin: ["ketchup"]}}] }, {$push: {ingredientes: "ketchup"}});
db.produtos.find({}, {nome: 1, ingredientes: 1, _id: 0});
