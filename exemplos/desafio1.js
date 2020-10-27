db.produtos.updateMany({}, { $set: { criadoPor: "Ronald McDonald" } });

db.produtos
  .find({ criadoPor: "Ronald McDonald" }, { _id: 0, nome: 1, criadoPor: 1 })
  .pretty();
