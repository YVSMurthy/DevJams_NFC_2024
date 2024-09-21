const CollectionManager = require("../api/CollectionManager")
const DatabaseInstanceManager = require("../api/DatabaseInstanceManager")
const ClientManager = require("../mongoDB/ClientManager")

class DatabaseManager {
    #clientManager = new ClientManager()
    #database = null
    #collectionManger = new CollectionManager()


    initialise() {
        this.#clientManager.createDefaultClient()
        this.#database = DatabaseInstanceManager.getInstance(this.#clientManager.getClient())
    }

    setActiveCollection(collectionName) {
        this.#collectionManger.setActiveCollection(collectionName, this.#database)
    }

    getCollectionManager() {
        return this.#collectionManger
    }

}

module.exports = DatabaseManager