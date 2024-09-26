const express = require("express");
const DatabaseManager = require("../network/DatabaseManager");
const MongoRepository = require("../repository/MongoRepository");
const SchemaAdapter = require("../adapters/SchemaAdapter");
const QueryApi = require("../api/QueryApi");

let dbManager = new DatabaseManager()
dbManager.initialise()

const api = new QueryApi(dbManager)
const repository = new MongoRepository(api)

const app = express()

app.get("/getProductById", async (req, res) => {
  if (dbManager.getCollectionManager().getActiveCollectionName() != "product") {
        dbManager.setActiveCollection("products")
  }

  let queryRes = await repository.getData( { product_id: req.query.product_id.toString().trim() } )
  let adaptedRes = await SchemaAdapter.queryResponseToArray(queryRes)
  res.send(JSON.stringify(adaptedRes))
  
})

app.get("/", (req, res) => {
  res.end("0")
})

app.get("/getProductHash", async (req, res) => {
  if (dbManager.getCollectionManager().getActiveCollectionName() != "product_hashes") {
    dbManager.setActiveCollection("product_hashes")
  }
  
  let queryRes = await repository.getData( { product_id: req.query.product_id.toString().trim() } )
  let adaptedRes = await SchemaAdapter.queryResponseToArray(queryRes)
  res.send(JSON.stringify(adaptedRes))
  
})


app.listen(5050)
