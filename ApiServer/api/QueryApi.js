class QueryApi {
    #databaseManager = null
    constructor(databaseManager) {
        this.#databaseManager = databaseManager
    }
    async getData(queryParams) {
        let res = await this.#databaseManager.getCollectionManager().getActiveCollection().find(queryParams).project({ "_id": 0 })
        return res
    }
}

module.exports = QueryApi