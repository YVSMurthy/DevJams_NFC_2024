const { MongoClient, ServerApiVersion } = require('mongodb');
const { MongoClientFactory } = require('../mongoDB/MongoClientFactory')


class DatabaseInstanceManager {
    static #database = null;

    static getInstance(client) {
        if (this.#database) {
            return this.#database
        } else {
            this.#database = client.db("DevJams")
            return this.#database

        }
    }

    static dispose() {
        console.log("Database Disposed")
    }
}

module.exports = DatabaseInstanceManager